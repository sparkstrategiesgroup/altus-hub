import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const rsvp = await prisma.eventRsvp.upsert({
      where: {
        userId_sessionId: {
          userId: session.user.id,
          sessionId: id,
        },
      },
      update: { status: "attending" },
      create: {
        userId: session.user.id,
        sessionId: id,
        status: "attending",
      },
    });

    return NextResponse.json(rsvp);
  } catch {
    return NextResponse.json({ error: "Failed to RSVP" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.eventRsvp.deleteMany({
      where: {
        userId: session.user.id,
        sessionId: id,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to cancel RSVP" },
      { status: 500 }
    );
  }
}
