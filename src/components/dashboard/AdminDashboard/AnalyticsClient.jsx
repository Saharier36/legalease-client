"use client";

import { Card } from "@heroui/react";
import {
  FaUsers,
  FaUserTie,
  FaFileInvoiceDollar,
  FaDollarSign,
} from "react-icons/fa";
import UserLawyerPieChart from "./UserLawyerPieChart";
import HiresBarChart from "./HiresBarChart";

export default function AnalyticsClient({ analytics }) {
  const { totalUsers, totalLawyers, totalHires, totalRevenue } = analytics;

  const statsData = [
    {
      label: "Total Users",
      value: totalUsers,
      sub: "Registered members",
      icon: FaUsers,
    },
    {
      label: "Total Lawyers",
      value: totalLawyers,
      sub: "Active service listings",
      icon: FaUserTie,
    },
    {
      label: "Total Hires",
      value: totalHires,
      sub: "All time hirings",
      icon: FaFileInvoiceDollar,
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      sub: "Platform earnings",
      icon: FaDollarSign,
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
            Platform-wide statistics including users, lawyers, hires, and
            revenue.
          </p>
        </div>

        {/* Stats cards */}
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserLawyerPieChart
            totalUsers={totalUsers}
            totalLawyers={totalLawyers}
          />
          <HiresBarChart totalHires={totalHires} />
        </div>
      </div>
    </div>
  );
}
