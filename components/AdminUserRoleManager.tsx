// components/AdminUserRoleManager.tsx
"use client";

import React, { useEffect, useState } from "react";

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
};

export default function AdminUserRoleManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [changingUserId, setChangingUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        throw new Error((await res.json()).error || "Error al obtener usuarios");
      }
      const data = await res.json();
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function changeRole(userId: string, role: "ADMIN" | "USER") {
    setChangingUserId(userId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Error al cambiar rol");
      // actualizar UI localmente
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setChangingUserId(null);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Administración de usuarios</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      {loading ? (
        <div>Cargando usuarios…</div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left">
              <th className="py-2">Nombre</th>
              <th className="py-2">Email</th>
              <th className="py-2">Rol</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-2">{u.name || "—"}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2 font-medium">{u.role}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    {u.role !== "ADMIN" ? (
                      <button
                        className="px-3 py-1 rounded bg-blue-600 text-white"
                        onClick={() => changeRole(u.id, "ADMIN")}
                        disabled={!!changingUserId}
                      >
                        Hacer admin
                      </button>
                    ) : (
                      <button
                        className="px-3 py-1 rounded bg-gray-300 text-black"
                        onClick={() => changeRole(u.id, "USER")}
                        disabled={!!changingUserId}
                      >
                        Quitar admin
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}