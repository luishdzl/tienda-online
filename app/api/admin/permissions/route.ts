import { NextResponse } from "next/server";
import { auth } from "@/features/auth/auth.config";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const permissions = await prisma.permission.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ permissions });
}