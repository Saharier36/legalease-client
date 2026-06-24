"use client";

import React from "react";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  Card,
  Chip,
} from "@heroui/react";
import { useUserSession } from "@/core/session-client";
import {
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCrown,
  FaUserAlt,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import EditProfileModal from "@/components/ui/EditProfileModal";

export default function GeneralProfileDashboard() {
  const { user } = useUserSession();

  const formatDate = (dateString) => {
    if (!dateString) return "Recent Member";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getRoleConfiguration = (role) => {
    const currentRole = role?.toLowerCase();

    if (currentRole === "admin") {
      return {
        bg: "#7C3AED",
        text: "#FFFFFF",
        border: "#7C3AED",
        icon: <FaCrown size={10} />,
        defaultBio:
          "Platform Administrator. Managing LegalEase infrastructure, access compliance, and system workflows.",
      }; // Premium Purple for Admin
    }

    if (currentRole === "lawyer") {
      return {
        bg: "#0A422A",
        text: "#A3F367",
        border: "#A3F367",
        icon: <FaUserShield size={10} />,
        defaultBio:
          "LegalEase Practitioner. Dedicated to providing structured legal assistance and reliable consultation services.",
      }; // Lime-Green for Lawyer
    }

    return {
      bg: "#1E293B",
      text: "#F8FAFC",
      border: "#334155",
      icon: <FaUserAlt size={9} />,
      defaultBio:
        "LegalEase Platform Member. Seeking simplified legal connections and professional guidance.",
    }; // Slate for General User
  };

  const roleConfig = getRoleConfiguration(user?.role);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 transition-colors duration-300">
      <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none shadow-lg overflow-hidden transition-colors duration-300">
        <div className="h-32 md:h-44 w-full bg-gradient-to-r from-zinc-900 via-neutral-800 to-zinc-950 relative border-b border-zinc-200 dark:border-zinc-800">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#A3F367_1px,transparent_1px)] [background-size:16px_16px]" />
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              backgroundColor:
                user?.role?.toLowerCase() === "admin" ? "#7C3AED" : "#A3F367",
            }}
          />
        </div>

        <div className="px-6 md:px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-16 md:-mt-20 mb-4 relative z-10">
            <div className="relative">
              <AvatarRoot
                className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 bg-background shrink-0 shadow-xl"
                style={{
                  borderColor:
                    user?.role?.toLowerCase() === "admin"
                      ? "#7C3AED"
                      : "#A3F367",
                }}
              >
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={user?.image}
                  alt={user?.name || "Profile Picture"}
                  className="rounded-full object-cover"
                />
                <AvatarFallback
                  className="text-zinc-950 text-3xl font-black"
                  style={{
                    backgroundColor:
                      user?.role?.toLowerCase() === "admin"
                        ? "#7C3AED"
                        : "#A3F367",
                    color:
                      user?.role?.toLowerCase() === "admin"
                        ? "#FFF"
                        : "#09090b",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </AvatarRoot>
              <span
                className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-background shadow-md"
                style={{
                  backgroundColor:
                    user?.role?.toLowerCase() === "admin"
                      ? "#7C3AED"
                      : "#A3F367",
                }}
              />
            </div>

            <div className="pt-2">
              <EditProfileModal
                user={user}
                onSuccess={() => window.location.reload()}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground uppercase">
                  {user?.name || "Anonymous User"}
                </h1>
                <MdVerified
                  className="text-xl shrink-0"
                  style={{
                    color:
                      user?.role?.toLowerCase() === "admin"
                        ? "#7C3AED"
                        : "#A3F367",
                  }}
                />

                <Chip
                  size="sm"
                  className="font-black rounded-none uppercase text-[10px] tracking-widest border px-1"
                  style={{
                    backgroundColor: roleConfig.bg,
                    color: roleConfig.text,
                    borderColor: roleConfig.border,
                  }}
                >
                  <span className="flex items-center gap-1">
                    {roleConfig.icon}
                    {user?.role || "User"}
                  </span>
                </Chip>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl font-medium leading-relaxed">
                {user?.bio || roleConfig.defaultBio}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center gap-2 max-w-xs min-w-0">
                <FaEnvelope
                  className="shrink-0 text-zinc-400 dark:text-zinc-500"
                  size={12}
                />
                <span className="normal-case font-medium text-sm text-foreground-600 truncate">
                  {user?.email || "No Email Provided"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt
                  className="shrink-0 text-zinc-400 dark:text-zinc-500"
                  size={12}
                />
                <span className="font-medium normal-case text-foreground-600">
                  Dhaka, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <FaCalendarAlt
                  className="shrink-0 text-zinc-400 dark:text-zinc-500"
                  size={12}
                />
                <span className="font-medium normal-case text-foreground-600">
                  Joined {formatDate(user?.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
