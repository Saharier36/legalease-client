"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import { TbGavel } from "react-icons/tb";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center p-4 md:p-6 bg-background text-foreground">
      <Card className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 md:p-8 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-3 bg-[#A3F367]/10 text-[#A3F367] rounded-full">
            <TbGavel size={32} className="transform -rotate-45" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#A3F367]">
            Error 404 • Case Not Found
          </p>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Page Dissolved
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-sm mx-auto leading-relaxed">
            The legal brief or route you are looking for does not exist, has
            been archived, or moved to another jurisdiction.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => router.push("/")}
            size="md"
            className="w-full rounded-none sm:w-auto font-black uppercase text-[11px] tracking-widest h-10 px-6 shadow-md text-black active:scale-95 transition-transform"
            style={{ backgroundColor: "#A3F367" }}
          >
            Return to Home
          </Button>

          <Button
            onClick={() => router.back()}
            size="md"
            variant="bordered"
            className="w-full rounded-none sm:w-auto font-black uppercase text-[11px] tracking-widest h-10 px-6 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-foreground active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2">
              <HiArrowLeft size={14} />
              Go Back
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
}
