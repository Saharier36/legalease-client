"use client";

import { useState } from "react";
import { Chip } from "@heroui/react";
import { MdVerified, MdOutlineGavel } from "react-icons/md";
import { FaDollarSign, FaArrowLeft } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import CommentSection from "./CommentSection";
import HireModal from "./HireModal";
import { VscLaw } from "react-icons/vsc";

export default function LawyerDetailsClient({ lawyer, user, hasPaid }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHiring, setIsHiring] = useState(false);

  const isBusy =
    lawyer?.status?.toLowerCase() === "busy" ||
    lawyer?.status?.toLowerCase() === "unavailable";

  const joinedDate = lawyer?.createdAt
    ? new Date(lawyer.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const handleConfirmHire = async () => {
    setIsHiring(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lawyerId: lawyer._id,
          lawyerName: lawyer.name,
          fee: lawyer.fee,
          lawyerUserId: lawyer.lawyerId,
          lawyerSpecialization: lawyer.specialization,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsHiring(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Back link */}
        <Link href="/browse-lawyers">
          <button className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#A3F367] cursor-pointer transition-colors duration-200 mb-2">
            <FaArrowLeft
              size={10}
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            Back
          </button>
        </Link>

        {/* Page Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Lawyer Details
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-xs">
            Review credentials, experience, and availability before sending a
            hiring request.
          </p>
        </div>

        {/* Profile block */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div
            className={`h-1 w-full ${isBusy ? "bg-red-500/60" : "bg-[#A3F367]"}`}
          />

          <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Photo */}
            <div
              className={`relative w-36 h-36 shrink-0 border-2 overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${isBusy ? "border-red-500/50" : "border-[#A3F367]"}`}
            >
              {lawyer.image ? (
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span
                  className={`flex h-full w-full items-center justify-center text-3xl font-black ${isBusy ? "text-red-400" : "text-[#A3F367]"}`}
                >
                  {lawyer.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <div className="flex items-center gap-2 text-[#A3F367] text-[10px] font-black tracking-widest uppercase mb-1">
                  <VscLaw size={12} />
                  <span>Legal Professional</span>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                    {lawyer.name}
                  </h1>
                  <MdVerified className="shrink-0 text-lg text-[#A3F367]" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Chip
                  className={`rounded-none text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 ${
                    isBusy
                      ? "border-red-500/40 bg-red-500/10 text-red-400"
                      : "border-[#A3F367]/40 bg-[#A3F367]/10 text-[#6dcf45]"
                  }`}
                >
                  {isBusy ? "Busy" : "Available"}
                </Chip>
                <Chip className="rounded-none text-[10px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-700 bg-background text-zinc-500 dark:text-zinc-400 px-2 py-0.5">
                  {lawyer.specialization}
                </Chip>
              </div>

              {joinedDate && (
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
                  <FaCalendarDays size={10} />
                  <span>Joined {joinedDate}</span>
                </div>
              )}
            </div>

            {/* Fee + CTA */}
            <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
              <div className="border border-zinc-100 dark:border-zinc-800 px-5 py-3 bg-background">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                  Consultation Fee
                </p>
                <div className="flex items-baseline gap-0.5">
                  <FaDollarSign
                    size={12}
                    className={isBusy ? "text-red-400" : "text-[#A3F367]"}
                  />
                  <span className="text-3xl font-black text-zinc-900 dark:text-white leading-none">
                    {lawyer.fee}
                  </span>
                  <span className="text-xs text-zinc-400">/hr</span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={
                  !user ||
                  hasPaid ||
                  user?.role === "lawyer" ||
                  user?.role === "admin"
                }
                className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 rounded-none ${
                  !user
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-200 dark:border-zinc-700"
                    : user?.role === "lawyer" || user?.role === "admin"
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-200 dark:border-zinc-700"
                      : hasPaid
                        ? "bg-[#A3F367]/10 border border-[#A3F367]/30 text-[#6dcf45] cursor-not-allowed"
                        : isBusy
                          ? "bg-red-500/10 border border-red-500/30 text-red-400 cursor-not-allowed"
                          : "bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 cursor-pointer"
                }`}
              >
                <MdOutlineGavel size={13} />
                {!user
                  ? "Login to Hire"
                  : user?.role === "lawyer" || user?.role === "admin"
                    ? "Not Available for Your Role"
                    : hasPaid
                      ? "Already Hired"
                      : isBusy
                        ? "Currently Unavailable"
                        : "Hire This Lawyer"}
              </button>

              {!user && (
                <p className="text-[10px] text-zinc-400 text-right">
                  <Link
                    href="/login"
                    className="text-[#A3F367] hover:underline font-bold"
                  >
                    Login
                  </Link>{" "}
                  to send a hiring request
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bio block */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="border-b border-zinc-100 dark:border-zinc-800 px-6 py-4">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              Professional Summary
            </span>
          </div>
          <div className="px-6 py-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {lawyer.bio || "No bio available."}
            </p>
          </div>
        </div>

        {/* Comment section */}
        <CommentSection lawyerId={lawyer._id} hasPaid={hasPaid} user={user} />
      </div>

      {/* Hire Modal */}
      <HireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmHire}
        lawyer={lawyer}
        isLoading={isHiring}
      />
    </div>
  );
}
