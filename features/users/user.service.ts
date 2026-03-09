import { userRepository } from "./user.repository";

export async function changeUserRole(actorId: string, targetId: string, newRole: "ADMIN" | "USER") {
  const user = await userRepository.getById(targetId);
  if (!user) throw new Error("Usuario no encontrado");

  if (user.role === "ADMIN" && newRole !== "ADMIN") {
    const admins = await userRepository.countAdmins();
    if (admins <= 1) throw new Error("No puedes eliminar el último administrador");
  }

  if (actorId === targetId && newRole !== "ADMIN")
    throw new Error("No puedes quitarte permisos administrativos a ti mismo");

  return userRepository.updateRole(targetId, newRole);
}