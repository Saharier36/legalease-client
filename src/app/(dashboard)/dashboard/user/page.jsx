"use client";

import { Card, Chip, Button } from "@heroui/react";
import { useUserSession } from "@/core/session-client";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaCrown,
} from "react-icons/fa";
import { MdOutlineGavel, MdVerified } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const statsData = [
  {
    label: "Total Hired",
    value: "12",
    sub: "+3 this month",
    icon: FaFileInvoiceDollar,
  },
  {
    label: "Accepted",
    value: "8",
    sub: "Active cases",
    icon: FaCheckCircle,
  },
  {
    label: "Pending",
    value: "3",
    sub: "Awaiting response",
    icon: FaHourglassHalf,
  },
  {
    label: "Rejected",
    value: "1",
    sub: "Closed requests",
    icon: FaTimesCircle,
  },
];

const activityData = [
  { month: "Jan", hirings: 1 },
  { month: "Feb", hirings: 3 },
  { month: "Mar", hirings: 2 },
  { month: "Apr", hirings: 5 },
  { month: "May", hirings: 4 },
  { month: "Jun", hirings: 7 },
];

export default function UserDashboard() {
  const { user } = useUserSession();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6 text-foreground">
      {/* Welcome */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#A3F367] mb-1">
          Welcome back
        </p>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
          {user?.name || "User"}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          Manage your legal hiring requests, track payment status, and
          communicate with your lawyers — all from one place.
        </p>
      </div>

      {/* Upgrade banner */}
      <div className="relative border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A3F367]" />
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#A3F367]/10 text-[#A3F367]">
            <FaCrown size={16} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground">
              Upgrade to Premium
            </h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Get priority access to top lawyers, exclusive legal resources, and
              faster response times on all your hiring requests.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          radius="none"
          className="font-black uppercase text-[10px] tracking-widest h-8 shrink-0 shadow-md active:scale-95"
          style={{ backgroundColor: "#A3F367", color: "#000000" }}
        >
          Upgrade Now
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-black tracking-tight text-foreground">
                    {stat.value}
                  </h3>
                </div>
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-[#A3F367]">
                  <Icon size={14} />
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 mt-3 font-semibold">
                {stat.sub}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Chart + profile summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hiring activity chart */}
        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 lg:col-span-2 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground">
              Hiring Activity
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Number of lawyers hired per month
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#27272a"
                />
                <XAxis
                  dataKey="month"
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderColor: "#27272a",
                    borderRadius: "0px",
                    color: "#ffffff",
                  }}
                />
                <Bar dataKey="hirings" radius={0}>
                  {activityData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === activityData.length - 1
                          ? "#A3F367"
                          : "#27272a"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Profile summary */}
        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-foreground">
                Account Summary
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Your profile at a glance
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
                  <MdVerified className="text-[#A3F367] text-base shrink-0" />
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
                  Account Status
                </label>
                <Chip
                  size="sm"
                  className="font-bold rounded-none uppercase text-[9px] tracking-widest border"
                  style={{
                    backgroundColor: "#0A422A",
                    color: "#A3F367",
                    borderColor: "#A3F367",
                  }}
                >
                  Active Member
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
