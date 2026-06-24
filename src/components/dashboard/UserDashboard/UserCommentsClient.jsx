"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteComment, updateComment } from "@/services/actions";
import { MdOutlineGavel } from "react-icons/md";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentDialog from "./DeleteCommentDialog";

export default function UserCommentsClient({ comments: initial, userId }) {
  const [comments, setComments] = useState(initial);

  const handleDelete = async (id) => {
    const data = await deleteComment(id, userId);
    if (data?.success) {
      setComments((prev) => prev.filter((c) => c._id !== id));
      toast.success("Comment deleted.");
    } else {
      toast.error(data?.message || "Failed to delete.");
    }
  };

  const handleUpdate = async (id, text) => {
    const data = await updateComment(id, text, userId);
    if (data?.success) {
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, text } : c)),
      );
      toast.success("Comment updated.");
      return true;
    } else {
      toast.error(data?.message || "Failed to update.");
      return false;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            My Reviews
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
            Manage your reviews on lawyer profiles.
          </p>
        </div>

        {comments.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/10">
            <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">
              No Reviews Yet
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
                      Review
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Lawyer
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors"
                    >
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 text-xs max-w-sm">
                        {c.text}
                      </td>
                      <td className="px-6 py-4 text-zinc-900 dark:text-white text-xs font-semibold whitespace-nowrap">
                        {c.lawyerName}
                        <span className="block text-[10px] text-zinc-400 font-normal">
                          {c.lawyerSpecialization}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 text-xs whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <EditCommentModal
                            comment={c}
                            onUpdate={handleUpdate}
                          />
                          <DeleteCommentDialog
                            comment={c}
                            onDelete={handleDelete}
                          />
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
