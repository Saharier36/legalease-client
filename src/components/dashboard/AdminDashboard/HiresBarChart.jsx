"use client";

import { Card } from "@heroui/react";
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

const COLORS = ["#eab308", "#A3F367", "#ef4444", "#3b82f6"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2">
        <p className="text-xs font-bold text-zinc-900 dark:text-white">
          {payload[0].payload.label}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function HiresBarChart({ totalHires }) {
  const data = [
    { label: "Pending", value: Math.round(totalHires * 0.2) },
    { label: "Accepted", value: Math.round(totalHires * 0.6) },
    { label: "Rejected", value: Math.round(totalHires * 0.1) },
    { label: "Paid", value: Math.round(totalHires * 0.1) },
  ];

  return (
    <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-xs font-black tracking-widest uppercase text-foreground">
          Hiring Breakdown
        </h3>
        <p className="text-[11px] text-zinc-400 mt-0.5">
          Total {totalHires} hires across all statuses
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#27272a"
            />
            <XAxis
              dataKey="label"
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
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="value" radius={0}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
