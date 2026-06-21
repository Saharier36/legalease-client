"use client";

import React, { useEffect, useState } from "react";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  Card,
  Chip,
} from "@heroui/react";
import { useUserSession } from "@/core/session-client";
import { fetchLawyerServices } from "@/services/lawyers/lawyerQueries";
import {
  FaEnvelope,
  FaUserShield,
  FaBriefcase,
  FaDollarSign,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import EditProfileModal from "@/components/dashboard/LawyerDashboard/EditProfileModal";

export default function LawyerProfileDashboard() {
  const { user } = useUserSession();
  const [services, setServices] = useState([]);
  const [isServicesLoading, setIsServicesLoading] = useState(true);

  const currentLawyerId = user?.id;

  useEffect(() => {
    if (!currentLawyerId) return;

    fetchLawyerServices(currentLawyerId)
      .then((result) => {
        if (Array.isArray(result)) setServices(result);
      })
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setIsServicesLoading(false));
  }, [currentLawyerId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 transition-colors duration-300">
      <Card className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none shadow-md p-6 md:p-8 relative overflow-hidden transition-colors duration-300">
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: "#A3F367" }}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
          <div className="relative">
            <AvatarRoot
              className="w-24 h-24 rounded-full border-2 p-0.5 shrink-0"
              style={{ borderColor: "#A3F367" }}
            >
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user?.image}
                alt={user?.name || "User"}
                className="rounded-full object-cover"
              />
              <AvatarFallback className="bg-[#A3F367] text-zinc-950 text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </AvatarRoot>
            {/* active online dot */}
            <span
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-background transition-colors duration-300"
              style={{ backgroundColor: "#A3F367" }}
            />
          </div>

          <div className="flex-1 space-y-3 min-w-0 w-full">
            {/* নাম এবং জয়েনিং ডেট */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full text-center sm:text-left">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-black tracking-tight uppercase text-foreground flex items-center justify-center sm:justify-start gap-1.5">
                  {user?.name}
                  <MdVerified className="text-[#A3F367] text-xl shrink-0" />
                </h1>
                <Chip
                  size="sm"
                  className="font-bold rounded-none uppercase text-[10px] tracking-widest mt-1 border"
                  style={{
                    backgroundColor: "#0A422A",
                    color: "#A3F367",
                    borderColor: "#A3F367",
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <FaUserShield size={11} />
                    {user?.role || "Lawyer"}
                  </span>
                </Chip>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                {(user?.createdAt || services[0]?.createdAt) && (
                  <div className="flex items-center justify-center sm:justify-end gap-1.5 text-[11px] font-black tracking-wider uppercase text-zinc-400 dark:text-zinc-500 pt-1">
                    <FaCalendarAlt size={11} style={{ color: "#A3F367" }} />
                    <span>
                      Joined:{" "}
                      {formatDate(user?.createdAt || services[0]?.createdAt)}
                    </span>
                  </div>
                )}
                <EditProfileModal
                  user={user}
                  onSuccess={() => window.location.reload()}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center justify-center gap-2">
                <FaEnvelope
                  className="shrink-0"
                  style={{ color: "#A3F367" }}
                  size={12}
                />
                <span className="normal-case font-medium text-sm text-foreground-600 truncate">
                  {user?.email || "gsaharier761@gmail.com"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full my-6 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300" />

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <FaBriefcase size={14} style={{ color: "#A3F367" }} />
            <h3 className="text-xs font-black tracking-widest uppercase">
              Expertise & Service Listings
            </h3>
          </div>

          {isServicesLoading ? (
            <p className="text-xs text-zinc-400 animate-pulse">
              Loading expertise data...
            </p>
          ) : services.length === 0 ? (
            <p className="text-xs text-zinc-400 italic">
              No specializations registered yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border border-zinc-200 dark:border-zinc-800 bg-content1 rounded-none transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-7"
                      style={{ backgroundColor: "#A3F367" }}
                    />
                    <span className="text-sm font-bold text-foreground tracking-wide">
                      {service.specialization || "General Practice"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {/* hourly fee badge */}
                    <Chip
                      size="sm"
                      variant="flat"
                      className="rounded-none font-black text-xs h-6 px-1.5 border"
                      style={{
                        backgroundColor: "#0A422A",
                        color: "#A3F367",
                        borderColor: "#0A422A",
                      }}
                    >
                      <span className="flex items-center text-[11px]">
                        <FaDollarSign size={10} style={{ color: "#A3F367" }} />
                        {service.fee || "0"}/hr
                      </span>
                    </Chip>

                    {/* status badge */}
                    <Chip
                      size="sm"
                      variant="flat"
                      className="rounded-none font-bold text-[10px] h-6 px-1.5 uppercase tracking-wider"
                      color={
                        service.status === "Available" ? "success" : "warning"
                      }
                    >
                      {service.status || "Available"}
                    </Chip>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
