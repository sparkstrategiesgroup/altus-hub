import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const resourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.string(),
  url: z.string().url(),
  sessionId: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const resources = await prisma.resource.findMany({
    where: type && type !== "all" ? { type } : undefined,
    include: {
      session: { select: { id: true, title: true } },
      uploadedBy: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(resources);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = resourceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const resource = await prisma.resource.create({
      data: {
        ...parsed.data,
        uploadedById: session.user.id,
      },
    });

    return NextResponse.json(resource);
  } catch {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
