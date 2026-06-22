"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

function LawyerCardSkeleton() {
  return (
    <div className="relative w-full border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
      {/* Top accent bar */}
      <div className="h-0.75 w-full bg-zinc-200 dark:bg-zinc-700" />

      {/* Main body */}
      <div className="flex items-start gap-5 px-5 py-6">
        {/* Left column: avatar + fee */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          {/* Avatar */}
          <Skeleton className="h-18 w-18 rounded-none" />

          {/* Fee */}
          <div className="flex items-baseline gap-0.5">
            <Skeleton className="h-3 w-14 rounded-none" />
          </div>
        </div>

        {/* Right column */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {/* Name + verified icon */}
          <Skeleton className="h-4 w-3/4 rounded-none" />

          {/* Specialization */}
          <Skeleton className="h-3 w-1/2 rounded-none" />

          {/* Status badge */}
          <Skeleton className="h-5 w-16 rounded-none" />

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Skeleton className="h-4 w-12 rounded-none" />
            <Skeleton className="h-4 w-14 rounded-none" />
            <Skeleton className="h-4 w-10 rounded-none" />
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-4 dark:border-zinc-800">
        <Skeleton className="h-3 w-24 rounded-none" />
        <Skeleton className="h-3 w-3 rounded-none" />
      </div>
    </div>
  );
}

export default function LawyerCardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <LawyerCardSkeleton key={i} />
      ))}
    </div>
  );
}
