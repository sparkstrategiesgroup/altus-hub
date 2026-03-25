import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma as _prisma } from "@/lib/prisma";
const prisma = _prisma as any;

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const emailCampaigns = await prisma.emailCampaign.findMany({
      orderBy: { sentAt: "desc" },
    });

    return NextResponse.json(emailCampaigns);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch email campaigns";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
