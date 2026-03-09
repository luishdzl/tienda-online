import { auth } from "@/features/auth/auth.config";
import { redirect } from "next/navigation";
import UserRoleManager from "@/components/admin/AdminUserRoleManager";
import LogoutButton  from "@/components/auth/LogoutButton";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-6">
      <div className="flex justify-between items-center pt-20">
        <h1 className="text-3xl font-bold">Panel Administrativo</h1>
        <LogoutButton />
      </div>

      <UserRoleManager />
    </div>
  );
}