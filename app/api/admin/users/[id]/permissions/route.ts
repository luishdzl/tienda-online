import { NextResponse } from "next/server";
import { auth } from "@/features/auth/auth.config";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userPermissions = await prisma.userPermission.findMany({
    where: { userId: params.id },
    include: { permission: true },
  });

  return NextResponse.json({
    permissions: userPermissions.map((p) => p.permission),
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { permissionId, action } = await req.json();

  if (!permissionId || !action) {
    return NextResponse.json(
      { error: "Missing data" },
      { status: 400 }
    );
  }

  if (action === "add") {
    await prisma.userPermission.upsert({
      where: {
        userId_permissionId: {
          userId: params.id,
          permissionId,
        },
      },
      update: {},
      create: {
        userId: params.id,
        permissionId,
      },
    });
  }

  if (action === "remove") {
    await prisma.userPermission.deleteMany({
      where: {
        userId: params.id,
        permissionId,
      },
    });
  }

  const updated = await prisma.userPermission.findMany({
    where: { userId: params.id },
    include: { permission: true },
  });

  return NextResponse.json({
    permissions: updated.map((p) => p.permission),
  });
}