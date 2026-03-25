import { NextResponse } from "next/server";
import { auth } from "@/auth";
import nodemailer from "nodemailer";
import { z } from "zod";

const emailSchema = z.object({
  to: z.string().email("Invalid recipient email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().optional(),
  fileName: z.string(),
  csvContent: z.string(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { to, subject, message, fileName, csvContent } = parsed.data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const senderName = session.user.name ?? "Altus Collective";
    const senderEmail = process.env.SMTP_FROM ?? process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to,
      subject,
      text: message ?? `Please find the attached CSV file: ${fileName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #3a3a3a;">
          <h2 style="color: #c4a265;">Altus Collective</h2>
          <p>${message ?? `Please find the attached CSV file.`}</p>
          <p style="color: #6b7280; font-size: 12px;">
            Sent by ${senderName} via Altus Digital
          </p>
        </div>
      `,
      attachments: [
        {
          filename: fileName,
          content: csvContent,
          contentType: "text/csv",
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
