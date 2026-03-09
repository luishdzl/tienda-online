import prisma from "@/lib/prisma";

export const userRepository = {
  getAll: () => prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: "desc" }
  }),

  getById: (id: string) => prisma.user.findUnique({ where: { id } }),

  countAdmins: () => prisma.user.count({ where: { role: "ADMIN" } }),

  updateRole: (id: string, role: "ADMIN" | "USER") =>
    prisma.user.update({ where: { id }, data: { role } })
};