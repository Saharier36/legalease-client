"use client";

import React, { useEffect, useState } from "react";
import { getLawyers } from "@/services/lawyers/lawyerQueries";
import LawyerCard from "@/components/ui/LawyerCard";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineGavel } from "react-icons/md";

export default function FeaturedLawyers() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLawyers({});
        if (data && !data.error) {
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setLawyers(shuffled.slice(0, 6));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#A3F367] text-xs font-black tracking-widest uppercase mb-2">
              <MdOutlineGavel size={14} />
              <span>Featured</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Top Lawyers For You
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-2 max-w-sm">
              Browse our verified legal professionals and find the right lawyer
              for your needs.
            </p>
          </div>
        </div>

        {/* Grid */}
        {lawyers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {lawyers.map((lawyer, index) => (
              <LawyerCard key={lawyer._id} lawyer={lawyer} index={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-52 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link href="/browse-lawyers">
            <button className="group flex items-center gap-3 bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-black text-xs uppercase tracking-widest px-6 py-3 transition-all duration-200 rounded-none">
              Browse All Lawyers
              <FaArrowRight
                size={11}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
