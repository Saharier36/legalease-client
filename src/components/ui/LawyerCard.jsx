"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdVerified } from "react-icons/md";
import { FaDollarSign, FaArrowRight } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: (index % 4) * 0.09,
    },
  }),
};

export default function LawyerCard({ lawyer, index }) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  if (!lawyer) return null;

  const { _id, name, fee, specialization, image, status, tags } = lawyer;

  const isBusy =
    status?.toLowerCase() === "busy" || status?.toLowerCase() === "unavailable";

  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "L";

  return (
    <motion.div
      custom={index}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.24, margin: "0px 0px -40px 0px" }}
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => router.push(`/browse-lawyers/${_id}`)}
      className="group relative w-full cursor-pointer border border-zinc-200 bg-white dark:bg-zinc-900 transition-all duration-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      {/* Top accent bar */}
      <div
        className={`h-0.75 w-full ${isBusy ? "bg-red-500/60" : "bg-[#A3F367]"}`}
      />

      {/* Main body */}
      <div className="flex items-start gap-5 px-5 py-6">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div
            className={`relative h-18 w-18 overflow-hidden border-2 bg-zinc-100 dark:bg-zinc-900 ${
              isBusy ? "border-red-500/50" : "border-[#A3F367]"
            }`}
          >
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span
                className={`flex h-full w-full items-center justify-center text-xl font-bold ${
                  isBusy ? "text-red-400" : "text-[#A3F367]"
                }`}
              >
                {initials}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-0.5">
            <span className="mr-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Fee:
            </span>
            <FaDollarSign
              size={10}
              className={`mb-px ${isBusy ? "text-red-400" : "text-[#A3F367]"}`}
            />
            <span className="text-[17px] font-semibold leading-none text-zinc-900 dark:text-zinc-50">
              {fee || "0"}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
              /hr
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {/* Name + verified */}
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {name}
            </h3>
            <MdVerified className="shrink-0 text-[16px] text-[#A3F367]" />
          </div>

          {/* Specialization */}
          <p className="truncate text-[12px] text-zinc-500 dark:text-zinc-400">
            {specialization || "General Practice"}
          </p>

          <span
            className={`inline-block w-fit border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              isBusy
                ? "border-red-500/40 bg-red-500/10 text-red-400"
                : "border-[#A3F367]/40 bg-[#A3F367]/10 text-[#6dcf45]"
            }`}
          >
            {isBusy ? "Busy" : "Available"}
          </span>

          {/* Tags (optional) */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-4 transition-all duration-200 group-hover:bg-[#A3F367] dark:border-zinc-800">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 transition-colors duration-200 group-hover:text-zinc-950">
          View full profile
        </span>
        <FaArrowRight
          size={11}
          className="text-zinc-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-zinc-950 dark:text-zinc-600"
        />
      </div>
    </motion.div>
  );
}
