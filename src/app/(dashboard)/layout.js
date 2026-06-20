"use client";

import React, { useState } from "react";
import { Spinner, Button } from "@heroui/react";
import Sidebar from "@/components/layout/Sidebar";
import { useUserSession } from "@/core/session-client";
import { FaScaleBalanced } from "react-icons/fa6";
import Link from "next/link";
import { PiSidebarFill } from "react-icons/pi";

export default function DashboardLayout({ children }) {
  const { user, isPending } = useUserSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isPending) {
    return (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <Spinner size="lg" color="success" />
      </div>
    );
  }

  const userRole = user?.role || "user";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 flex flex-col md:flex-row">
      <Sidebar
        role={userRole}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 w-full md:pl-64">
        <header className="md:hidden sticky top-0 z-30 w-full flex items-center justify-between px-4 py-3 bg-[#0A422A] border-b border-white/10 shadow-md">
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              variant="flat"
              onClick={() => setIsSidebarOpen(true)}
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-none shadow-xs size-9 min-w-9"
            >
              <PiSidebarFill />
            </Button>

            <Link href="/">
              <div className=" flex items-center gap-2 text-md font-extrabold tracking-tight font-header text-white">
                <FaScaleBalanced className="text-[#A3F367] text-2xl" />
                <h2>
                  Legal<span className="text-[#A3F367]">Ease</span>
                </h2>
              </div>
            </Link>
          </div>

          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#A3F367]/10 text-[#A3F367] border border-[#A3F367]/20 rounded-none">
            {userRole}
          </span>
        </header>

        <main className="grow p-4 sm:p-6 md:p-8 w-full max-w-screen-2xl mx-auto">
          {children}
        </main>

        <footer className="w-full py-4 px-6 sm:px-8 bg-[#0A422A] border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-300">
          <span>
            &copy; {new Date().getFullYear()} LegalEase. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-slate-300 hover:text-[#A3F367] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-[#A3F367] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
