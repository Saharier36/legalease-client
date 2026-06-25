"use client";

import { Card, Chip } from "@heroui/react";
import { useUserSession } from "@/core/session-client";
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaShieldAlt,
  FaChartBar,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import Link from "next/link";

const quickActions = [
  {
    label: "Manage Users",
    description:
      "View all registered users, change their roles, or remove them from the platform.",
    icon: FaUsers,
    href: "/dashboard/admin/manage-users",
    chip: "Users",
  },
  {
    label: "All Transactions",
    description:
      "Browse all payment records including transaction ID, email, amount, and date.",
    icon: FaFileInvoiceDollar,
    href: "/dashboard/admin/all-transactions",
    chip: "Finance",
  },
  {
    label: "Analytics Overview",
    description:
      "View total users, lawyers, hires, and platform revenue at a glance.",
    icon: FaChartBar,
    href: "/dashboard/admin/analytics",
    chip: "Analytics",
  },
];

export default function AdminDashboardPage() {
  const { user } = useUserSession();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6 text-foreground">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
          {user?.name || "Admin"}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          Oversee users, lawyers, transactions, and platform analytics — full
          control from one place.
        </p>
      </div>

      {/* Quick actions + admin info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 lg:col-span-2 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground">
              Admin Controls
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Navigate to key management sections
            </p>
          </div>

          <div className="space-y-3">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link key={i} href={action.href}>
                  <div className="flex items-center justify-between border border-zinc-100 dark:border-zinc-800 px-4 py-3 hover:border-[#A3F367] transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-100 dark:bg-zinc-900 text-[#A3F367] group-hover:bg-[#A3F367]/10 transition-colors">
                        <Icon size={12} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white">
                          {action.label}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <Chip className="rounded-none text-[10px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 shrink-0">
                      {action.chip}
                    </Chip>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Admin profile summary */}
        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-foreground">
                Admin Profile
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Your account details
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Full Name
                </label>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-bold text-foreground">
                    {user?.name || "—"}
                  </span>
                  <MdVerified className="text-purple-400 text-base shrink-0" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Email
                </label>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mt-1 truncate">
                  {user?.email || "—"}
                </span>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                  Access Level
                </label>
                <Chip
                  size="sm"
                  className="font-bold rounded-none uppercase text-[9px] tracking-widest border"
                  style={{
                    backgroundColor: "#3b0764",
                    color: "#c084fc",
                    borderColor: "#7C3AED",
                  }}
                >
                  <div className="flex items-center gap-1">
                    <FaShieldAlt size={8} />
                    Super Admin
                  </div>
                </Chip>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 mt-4 flex items-center justify-between text-[11px] text-zinc-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <FaCalendarDays style={{ color: "#A3F367" }} size={10} />
              <span>Member Since</span>
            </div>
            <span className="font-bold text-zinc-300">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
