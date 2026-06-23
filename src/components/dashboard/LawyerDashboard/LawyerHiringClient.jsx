"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateHiringStatus } from "@/services/actions";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Chip } from "@heroui/react";

const statusStyles = {
  pending: "border-yellow-500/40 bg-yellow-500/10 text-yellow-500",
  accepted: "border-[#A3F367]/40 bg-[#A3F367]/10 text-[#6dcf45]",
  rejected: "border-red-500/40 bg-red-500/10 text-red-400",
};

export default function LawyerHiringClient({ hirings: initial, lawyerId }) {
  const [hirings, setHirings] = useState(initial);
  const [loadingId, setLoadingId] = useState(null);

  const handleAction = async (id, status) => {
    setLoadingId(id);
    try {
      const data = await updateHiringStatus(id, status, lawyerId);
      if (data?.success) {
        setHirings((prev) =>
          prev.map((h) => (h._id === id ? { ...h, status } : h)),
        );
        toast.success(
          status === "accepted"
            ? "Hiring request accepted!"
            : "Hiring request rejected.",
        );
        if (data.lawyerStatus === "Busy") {
          toast.warning("You are now marked as Busy (3+ active clients).");
        }
      } else {
        toast.error(data?.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to update status.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Hiring Requests
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
            Accept or reject hiring requests from clients. You will be marked as
            Busy after 3 active clients.
          </p>
        </div>

        {hirings.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/10">
            <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">
              No Hiring Requests Yet
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
                      Client
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Email
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Specialization
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Amount
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hirings.map((h) => (
                    <tr
                      key={h._id}
                      className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white text-xs">
                        {h.userName}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 text-xs">
                        {h.userEmail}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 text-xs">
                        {h.specialization || "—"}
                      </td>
                      <td className="px-6 py-4 text-zinc-900 dark:text-white text-xs font-bold">
                        ${h.amount}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 text-xs">
                        {new Date(h.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <Chip
                          className={`rounded-none text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 ${statusStyles[h.status] || statusStyles.pending}`}
                        >
                          {h.status}
                        </Chip>
                      </td>
                      <td className="px-6 py-4">
                        {h.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAction(h._id, "accepted")}
                              disabled={loadingId === h._id}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 rounded-none transition-all disabled:opacity-40"
                            >
                              <FaCheck size={9} />
                              Accept
                            </button>
                            <button
                              onClick={() => handleAction(h._id, "rejected")}
                              disabled={loadingId === h._id}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-none transition-all disabled:opacity-40"
                            >
                              <FaXmark size={9} />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                            —
                          </span>
                        )}
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
