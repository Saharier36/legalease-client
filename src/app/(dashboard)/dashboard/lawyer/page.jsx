"use client";

import React, { useEffect, useState } from "react";
import { Card, Chip, Button } from "@heroui/react";
import { useUserSession } from "@/core/session-client";
import { fetchLawyerServices } from "@/services/api";
import {
  FaBriefcase,
  FaDollarSign,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaCrown,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { name: "Jan", earnings: 400 },
  { name: "Feb", earnings: 800 },
  { name: "Mar", earnings: 600 },
  { name: "Apr", earnings: 1200 },
  { name: "May", earnings: 1500 },
  { name: "Jun", earnings: 2100 },
];

export default function LawyerDashboard() {
  const { user } = useUserSession();
  const [services, setServices] = useState([]);
  const [isServicesLoading, setIsServicesLoading] = useState(true);

  const currentLawyerId = user?.id;

  useEffect(() => {
    if (!currentLawyerId) return;

    fetchLawyerServices(currentLawyerId)
      .then((result) => {
        if (Array.isArray(result)) setServices(result);
      })
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setIsServicesLoading(false));
  }, [currentLawyerId]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6 text-foreground">
      <div className="relative border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A3F367]" />
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#A3F367]/10 rounded-none text-[#A3F367] mt-0.5">
            <FaCrown size={16} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground">
              Upgrade to Premium Badge
            </h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Get verified instantly, unlock advanced legal analytics, and
              secure 3x more client appointments on the platform.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Total Revenue
              </p>
              <h3 className="text-2xl font-black tracking-tight text-foreground">
                ${services[0]?.fee ? parseFloat(services[0].fee) * 62 : "2,108"}
              </h3>
            </div>
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-[#A3F367]">
              <FaDollarSign size={14} />
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-3 font-semibold">
            <span className="text-[#A3F367] font-black">+18%</span> vs last
            month
          </p>
        </Card>

        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Hourly Rate
              </p>
              <h3 className="text-2xl font-black tracking-tight text-foreground">
                ${services[0]?.fee || "34"}/hr
              </h3>
            </div>
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-[#A3F367]">
              <FaClock size={14} />
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-3 font-semibold">
            Status:{" "}
            <span className="text-[#A3F367] uppercase font-black">
              {services[0]?.status || "Available"}
            </span>
          </p>
        </Card>

        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Total Clients
              </p>
              <h3 className="text-2xl font-black tracking-tight text-foreground">
                48
              </h3>
            </div>
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-[#A3F367]">
              <FaUsers size={14} />
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-3 font-semibold">
            <span className="text-[#A3F367] font-black">+5 new</span> this week
          </p>
        </Card>

        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Active Listings
              </p>
              <h3 className="text-2xl font-black tracking-tight text-foreground">
                {isServicesLoading ? "..." : services.length || "1"}
              </h3>
            </div>
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-[#A3F367]">
              <FaBriefcase size={14} />
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-3 font-semibold">
            Category:{" "}
            <span className="text-foreground uppercase font-black">
              {services[0]?.specialization ? "Specialized" : "General"}
            </span>
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 lg:col-span-2 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground">
              Performance Analytics
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Monthly revenue growth overview
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorEarnings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#A3F367" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#A3F367" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#27272a"
                />
                <XAxis
                  dataKey="name"
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderColor: "#27272a",
                    borderRadius: "0px",
                    color: "#ffffff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#A3F367"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEarnings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-foreground">
                Current Practice
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Primary lawyer registration info
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Lead Practitioner
                </label>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-bold text-foreground">
                    {services[0]?.lawyerName || user?.name}
                  </span>
                  <MdVerified className="text-[#A3F367] text-base shrink-0" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Core Specialization
                </label>
                <span className="text-xs font-medium text-zinc-300 block mt-1">
                  {services[0]?.specialization || "Cyber & IT Law"}
                </span>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                  Verification Status
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
                  Active & Verified
                </Chip>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 mt-4 flex items-center justify-between text-[11px] text-zinc-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt style={{ color: "#A3F367" }} size={10} />
              <span>Registered Node</span>
            </div>
            <span className="font-bold text-zinc-300">
              {services[0]?.createdAt
                ? new Date(services[0].createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "Jun 2026"}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
