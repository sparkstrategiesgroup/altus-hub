import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: body.name,
        company: body.company,
        title: body.title,
        phone: body.phone,
        bio: body.bio,
      },
    });

    return NextResponse.json({ id: user.id, name: user.name });
  } catch {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
