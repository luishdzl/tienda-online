import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth"; // 👈 Import auth

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  // 👈 Use auth() instead of getToken
  const session = await auth();

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userIdToModify = params.id;
  const body = await req.json().catch(() => ({}));
  const newRole = body?.role;

  if (!newRole || !["ADMIN", "USER"].includes(newRole)) {
    return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
  }

  const userToModify = await prisma.user.findUnique({ where: { id: userIdToModify } });
  if (!userToModify) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  if (userToModify.role === "ADMIN" && newRole !== "ADMIN") {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: "No se puede eliminar el último administrador" },
        { status: 400 }
      );
    }
  }

  // 👈 Compare against session.user.id instead of token.sub
  if (session.user.id === userIdToModify && newRole !== "ADMIN") {
    return NextResponse.json(
      { error: "No puedes quitarte permisos administrativos a ti mismo" },
      { status: 403 }
    );
  }

  const updated = await prisma.user.update({
    where: { id: userIdToModify },
    data: { role: newRole as "ADMIN" | "USER" },
    select: { id: true, email: true, name: true, role: true, updatedAt: true },
  });

  return NextResponse.json({ user: updated });
}