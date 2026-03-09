import { auth } from "@/features/auth/auth.config";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  redirect("/dashboard");
}