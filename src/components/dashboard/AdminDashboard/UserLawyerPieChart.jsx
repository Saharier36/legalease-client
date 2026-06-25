"use client";

import { Card } from "@heroui/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#A3F367", "#27272a"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2">
        <p className="text-xs font-bold text-zinc-900 dark:text-white">
          {payload[0].name}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function UserLawyerPieChart({ totalUsers, totalLawyers }) {
  const data = [
    { name: "Users", value: totalUsers },
    { name: "Lawyers", value: totalLawyers },
  ];

  return (
    <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-xs font-black tracking-widest uppercase text-foreground">
          Users vs Lawyers
        </h3>
        <p className="text-[11px] text-zinc-400 mt-0.5">
          Platform member distribution
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
