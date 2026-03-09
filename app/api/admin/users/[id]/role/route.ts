import { NextResponse } from "next/server";
import { auth } from "@/features/auth/auth.config";
import { changeUserRole } from "@/features/users/user.service";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = await req.json();

  try {
    const user = await changeUserRole(session.user.id, params.id, role);
    return NextResponse.json({ user });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}