"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button, AvatarRoot, AvatarImage, AvatarFallback } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ui/ThemeToggle";
import { useSession, signOut } from "@/lib/auth-client";
import {
  FaUser,
  FaHistory,
  FaUserEdit,
  FaComments,
  FaBriefcase,
  FaUsersCog,
  FaReceipt,
  FaChartPie,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { FaScaleBalanced } from "react-icons/fa6";

const ROLE_ROUTES = {
  user: [
    { name: "My Profile", path: "/dashboard", icon: FaUser },
    {
      name: "Hiring History",
      path: "/dashboard/user/hiring-history",
      icon: FaHistory,
    },
    {
      name: "Update Profile",
      path: "/dashboard/user/update-profile",
      icon: FaUserEdit,
    },
    { name: "My Comments", path: "/dashboard/user/comments", icon: FaComments },
  ],
  lawyer: [
    { name: "My Profile", path: "/dashboard", icon: FaUser },
    {
      name: "Hiring Requests",
      path: "/dashboard/lawyer/hiring-history",
      icon: FaHistory,
    },
    {
      name: "Manage Legal Profile",
      path: "/dashboard/lawyer/manage-legal-profile",
      icon: FaBriefcase,
    },
  ],
  admin: [
    { name: "My Profile", path: "/dashboard", icon: FaUser },
    {
      name: "Manage Users",
      path: "/dashboard/admin/manage-users",
      icon: FaUsersCog,
    },
    {
      name: "All Transactions",
      path: "/dashboard/admin/all-transactions",
      icon: FaReceipt,
    },
    {
      name: "Analytics Overview",
      path: "/dashboard/admin/analytics",
      icon: FaChartPie,
    },
  ],
};

export default function Sidebar({ role = "user", isOpen, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const menuItems = ROLE_ROUTES[role] || ROLE_ROUTES["user"];

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const renderSidebarContent = () => (
    <div className="w-full h-full flex flex-col justify-between text-white">
      <div>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <Link href="/" onClick={onClose}>
              <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white cursor-pointer">
                <FaScaleBalanced className="text-[#A3F367] text-2xl" />
                <h2>
                  Legal<span className="text-[#A3F367]">Ease</span>
                </h2>
              </div>
            </Link>
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-[#A3F367]/10 text-[#A3F367] rounded-none mt-1">
              {role} Panel
            </span>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              isIconOnly
              variant="light"
              onClick={onClose}
              className="md:hidden text-slate-300 hover:text-white rounded-none size-8 min-w-8"
            >
              <FaTimes className="size-4" />
            </Button>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={index}
                href={item.path}
                className="block group"
                onClick={onClose}
              >
                <div
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-none relative
                    ${
                      isActive
                        ? "text-[#A3F367] bg-[#A3F367]/10 border-l-2 border-[#A3F367]"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Icon
                    className={`size-4 shrink-0 ${isActive ? "text-[#A3F367]" : "text-slate-400 group-hover:text-white"}`}
                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 flex items-center justify-between gap-2 bg-black/10">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <AvatarRoot className="w-8 h-8 rounded-full border border-[#A3F367] shrink-0">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={session?.user?.image}
              alt={session?.user?.name || "User"}
            />
            <AvatarFallback className="bg-[#A3F367] text-zinc-950 text-xs font-bold">
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </AvatarRoot>

          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-white truncate leading-tight">
              {session?.user?.name || "Anonymous User"}
            </span>
            <span className="text-[10px] text-slate-400 truncate mt-0.5">
              {session?.user?.email || "loading..."}
            </span>
          </div>
        </div>

        <Button
          isIconOnly
          variant="light"
          onClick={handleLogout}
          title="Log Out"
          className="text-rose-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-none size-8 min-w-8 shrink-0 transition-colors duration-150"
        >
          <FaSignOutAlt className="size-3.5" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="w-64 h-screen fixed left-0 top-0 z-30 hidden md:flex flex-col border-r border-white/5 bg-[#0A422A] shadow-lg">
        {renderSidebarContent()}
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="w-64 h-screen fixed left-0 top-0 z-50 bg-[#0A422A] border-r border-white/5 md:hidden flex flex-col shadow-2xl"
            >
              {renderSidebarContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
