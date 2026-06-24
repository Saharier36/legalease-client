"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import { GoShield } from "react-icons/go";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center p-4 md:p-6 bg-background text-foreground">
      <Card className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 md:p-8 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-3 bg-red-500/10 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-full">
            <GoShield size={32} className="animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-red-500 dark:text-red-400">
            Error 403 • Access Denied
          </p>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Restricted Access
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-sm mx-auto leading-relaxed">
            You do not have the required clearance or legal role to view this
            secure node. Please sign in with an authorized account or head back.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => router.push("/")}
            size="md"
            className="w-full rounded-none sm:w-auto font-black uppercase text-[11px] tracking-widest h-10 px-6 shadow-md bg-red-600 hover:bg-red-700 text-white active:scale-95 transition-transform"
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
