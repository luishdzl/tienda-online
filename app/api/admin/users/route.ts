import { NextResponse } from "next/server";
import { auth } from "@/features/auth/auth.config";
import { userRepository } from "@/features/users/user.repository";
import { userHasPermission } from "@/features/users/user.permissions";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasPermission = await userHasPermission(
    session.user.id,
    "users.manage"
  );

  if (!hasPermission) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await userRepository.getAll();
  return NextResponse.json({ users });
}