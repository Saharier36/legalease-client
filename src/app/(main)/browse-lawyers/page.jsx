"use client";

import LawyerCard from "@/components/ui/LawyerCard";
import { getLawyers } from "@/services/lawyers/lawyerQueries";
import React, { useEffect, useState } from "react";
import { BiSpreadsheet } from "react-icons/bi";

export default function AllLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLawyersData = async () => {
      try {
        setLoading(true);
        const data = await getLawyers();

        if (data && !data.error) {
          setLawyers(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading lawyers:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyersData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#A3F367] text-xs font-black tracking-widest uppercase mb-1">
              <BiSpreadsheet size={14} />
              <span>Directory</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
              Browse Lawyers
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-xs">
            Explore, analyze, and connect with top-tier legal professionals
            across digital compliance and assets.
          </p>
        </div>

        {!loading && error && (
          <div className="text-center py-12 border border-dashed border-red-500/30 bg-red-500/5 rounded-none">
            <p className="text-sm font-bold text-red-500 uppercase tracking-wider">
              Failed to load legal experts
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Please check your server connection or try again later.
            </p>
          </div>
        )}

        {!loading && !error && lawyers.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-none bg-zinc-100/50 dark:bg-zinc-900/10">
            <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">
              No Lawyers Available
            </p>
          </div>
        )}

        {!loading && !error && lawyers.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lawyers.map((lawyer, index) => (
              <LawyerCard key={lawyer._id} lawyer={lawyer} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
