import prisma from "@/lib/prisma";

export async function userHasPermission(
  userId: string,
  permissionName: string
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  if (!user) return false;

  // permisos directos
  const direct = user.permissions.some(
    (p) => p.permission.name === permissionName
  );

  if (direct) return true;

  // permisos por rol
  const rolePermissions = await prisma.rolePermission.findMany({
    where: { role: user.role },
    include: { permission: true },
  });

  return rolePermissions.some(
    (p) => p.permission.name === permissionName
  );
}