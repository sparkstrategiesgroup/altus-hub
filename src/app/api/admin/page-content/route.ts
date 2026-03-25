import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pageContents = await prisma.pageContent.findMany();

    return NextResponse.json(pageContents);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch page content";
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
    const { slug, title, content } = body;

    if (!slug || !title || content === undefined) {
      return NextResponse.json(
        { error: "slug, title, and content are required" },
        { status: 400 }
      );
    }

    const pageContent = await prisma.pageContent.upsert({
      where: { slug },
      update: {
        title,
        content,
        updatedBy: session.user.email || undefined,
      },
      create: {
        slug,
        title,
        content,
        updatedBy: session.user.email || undefined,
      },
    });

    return NextResponse.json(pageContent);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to upsert page content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
