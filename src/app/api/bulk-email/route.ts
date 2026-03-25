import { NextResponse } from "next/server";
import { auth } from "@/auth";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subject, htmlContent } = await req.json();

    if (!subject || !htmlContent) {
      return NextResponse.json(
        { error: "Subject and htmlContent are required" },
        { status: 400 }
      );
    }

    // Fetch all member accounts with email addresses
    const accounts = await prisma.memberAccount.findMany({
      where: {
        email: { not: null },
      },
      select: {
        id: true,
        email: true,
        primaryContact: true,
        accountName: true,
      },
    });

    const recipients = accounts.filter(
      (a) => a.email && a.email.trim().length > 0
    );

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No recipients found with email addresses" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const senderName = "Altus Collective";
    const senderEmail = process.env.SMTP_FROM ?? process.env.SMTP_USER;

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    // Send in batches of 10 with delay to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      const results = await Promise.allSettled(
        batch.map(async (recipient) => {
          // Personalize: replace (Name) with contact name
          const firstName = recipient.primaryContact
            ? recipient.primaryContact.split(" ")[0]
            : "there";
          const personalizedHtml = htmlContent
            .replace(/\(Name\)/g, firstName)
            .replace(/{{firstName}}/g, firstName)
            .replace(/{{companyName}}/g, recipient.accountName ?? "your company");

          await transporter.sendMail({
            from: `"${senderName}" <${senderEmail}>`,
            to: recipient.email!,
            subject,
            html: personalizedHtml,
          });
        })
      );

      for (const result of results) {
        if (result.status === "fulfilled") {
          sent++;
        } else {
          failed++;
          errors.push(result.reason?.message ?? "Unknown error");
        }
      }

      // Small delay between batches to respect rate limits
      if (i + batchSize < recipients.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Create EmailCampaign record
    await prisma.emailCampaign.create({
      data: {
        subject: subject,
        htmlContent: htmlContent.substring(0, 10000), // truncate for storage
        sentBy: session.user.email || "unknown",
        totalSent: sent,
        totalFailed: failed,
        status: failed > 0 ? "partial" : "completed",
      },
    });

    return NextResponse.json({
      success: true,
      total: recipients.length,
      sent,
      failed,
      errors: errors.slice(0, 10), // Only return first 10 errors
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send bulk email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
