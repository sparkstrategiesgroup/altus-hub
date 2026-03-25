import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const siteConfigs = await prisma.siteConfig.findMany();

    return NextResponse.json(siteConfigs);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch site config";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "key and value are required" },
        { status: 400 }
      );
    }

    const siteConfig = await prisma.siteConfig.upsert({
      where: { key },
      update: {
        value,
        updatedBy: session.user.email || undefined,
      },
      create: {
        key,
        value,
        updatedBy: session.user.email || undefined,
      },
    });

    return NextResponse.json(siteConfig);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to upsert site config";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
