"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateUserRole, deleteUser } from "@/services/actions";
import { MdOutlineGavel } from "react-icons/md";
import { Chip } from "@heroui/react";
import DeleteUserDialog from "./DeleteUserDialog";
import ChangeRoleModal from "./ChangeRoleModal";

const roleStyles = {
  admin: "border-purple-500/40 bg-purple-500/10 text-purple-400",
  lawyer: "border-[#A3F367]/40 bg-[#A3F367]/10 text-[#6dcf45]",
  user: "border-zinc-300/40 bg-zinc-100/10 text-zinc-400",
};

export default function ManageUsersClient({ users: initial, currentUserId }) {
  const [users, setUsers] = useState(initial);

  const handleRoleChange = async (id, role) => {
    const data = await updateUserRole(id, role);
    if (data?.success) {
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
      toast.success("Role updated successfully.");
      return true;
    } else {
      toast.error(data?.message || "Failed to update role.");
      return false;
    }
  };

  const handleDelete = async (id) => {
    const data = await deleteUser(id);
    if (data?.success) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted.");
    } else {
      toast.error(data?.message || "Failed to delete user.");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Manage Users
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
            View, change roles, and remove users from the platform.
          </p>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/10">
            <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">
              No Users Found
            </p>
          </div>
        ) : (
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="h-1 w-full bg-[#A3F367]" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Email
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Role
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Joined
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white text-xs">
                        {u.name || "—"}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 text-xs">
                        {u.email}
                      </td>
                      <td className="px-6 py-4">
                        <Chip
                          className={`rounded-none text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 ${roleStyles[u.role] || roleStyles.user}`}
                        >
                          {u.role || "user"}
                        </Chip>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 text-xs whitespace-nowrap">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ChangeRoleModal
                            user={u}
                            onRoleChange={handleRoleChange}
                          />
                          {u._id !== currentUserId && (
                            <DeleteUserDialog
                              user={u}
                              onDelete={handleDelete}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
