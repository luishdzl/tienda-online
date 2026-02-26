import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email } });

  if (exists)
    return NextResponse.json({ error: "Usuario ya existe" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "USER",
    },
  });

  return NextResponse.json({ success: true });
}