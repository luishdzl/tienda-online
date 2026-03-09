import { auth } from "@/features/auth/auth.config";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">
          Bienvenido, {session.user.name ?? "Usuario"}
        </h1>

        <p className="text-gray-600">
          Este es tu panel personal.
        </p>

        <LogoutButton />
      </div>
    </div>
  );
}