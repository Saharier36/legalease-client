"use client";

import { Skeleton } from "@heroui/react";

export default function LawyerDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top profile block */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mb-6">
          <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Image */}
            <Skeleton className="w-36 h-36 rounded-none shrink-0" />

            {/* Info */}
            <div className="flex flex-col gap-3 flex-1">
              <Skeleton className="h-6 w-2/5 rounded-none" />
              <Skeleton className="h-4 w-1/4 rounded-none" />
              <Skeleton className="h-4 w-1/3 rounded-none" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-20 rounded-none" />
                <Skeleton className="h-6 w-24 rounded-none" />
              </div>
            </div>

            {/* Fee + button */}
            <div className="flex flex-col gap-3 items-start md:items-end shrink-0">
              <Skeleton className="h-10 w-24 rounded-none" />
              <Skeleton className="h-10 w-32 rounded-none" />
            </div>
          </div>
        </div>

        {/* Bio block */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 mb-6">
          <Skeleton className="h-4 w-24 rounded-none mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full rounded-none" />
            <Skeleton className="h-3 w-5/6 rounded-none" />
            <Skeleton className="h-3 w-4/6 rounded-none" />
          </div>
        </div>

        {/* Comment block */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8">
          <Skeleton className="h-4 w-28 rounded-none mb-4" />
          <Skeleton className="h-24 w-full rounded-none" />
        </div>
      </div>
    </div>
  );
}
