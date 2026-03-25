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
    const navItems = await prisma.navItem.findMany({
      orderBy: { position: "asc" },
    });

    return NextResponse.json(navItems);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch nav items";
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
    const { href, label, icon, position, visible, adminOnly } = body;

    if (!href || !label || !icon) {
      return NextResponse.json(
        { error: "href, label, and icon are required" },
        { status: 400 }
      );
    }

    const navItem = await prisma.navItem.create({
      data: {
        href,
        label,
        icon,
        position: position ?? 0,
        visible: visible ?? true,
        adminOnly: adminOnly ?? false,
      },
    });

    return NextResponse.json(navItem);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create nav item";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, href, label, icon, position, visible, adminOnly } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const navItem = await prisma.navItem.update({
      where: { id },
      data: {
        ...(href !== undefined && { href }),
        ...(label !== undefined && { label }),
        ...(icon !== undefined && { icon }),
        ...(position !== undefined && { position }),
        ...(visible !== undefined && { visible }),
        ...(adminOnly !== undefined && { adminOnly }),
      },
    });

    return NextResponse.json(navItem);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update nav item";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    await prisma.navItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete nav item";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
