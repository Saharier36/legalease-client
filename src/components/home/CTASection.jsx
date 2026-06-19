"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FaChevronRight, FaRegHandshake } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CTASection() {
  return (
    <section className="w-full py-20 border-t border-divider bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="p-8 border border-divider bg-content1/20 flex flex-col justify-between items-start rounded-none group hover:border-[#A3F367]/40 transition-all duration-300"
          >
            <div>
              <span className="text-[#A3F367] text-xs font-bold tracking-wider uppercase mb-2 block">
                Need Legal Protection?
              </span>
              <h3 className="text-2xl font-extrabold text-foreground font-header mb-3">
                Find the Right Expert Today
              </h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 max-w-sm">
                Browse through thousands of verified lawyers and legal
                consultants. Get your contracts, disputes, and compliance
                handled smoothly.
              </p>
            </div>

            <Link href="/browse-lawyers">
              <Button
                endContent={<FaChevronRight className="text-[10px]" />}
                className="bg-foreground text-background font-bold px-5 py-5 rounded-none text-xs tracking-wider uppercase transition-all duration-200 group-hover:bg-[#A3F367] group-hover:text-zinc-950"
              >
                Browse Lawyers
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 border border-divider bg-content1/20 flex flex-col justify-between items-start rounded-none group hover:border-[#A3F367]/40 transition-all duration-300"
          >
            <div>
              <span className="text-[#A3F367] text-xs font-bold tracking-wider uppercase mb-2 block">
                Are You a Professional?
              </span>
              <h3 className="text-2xl font-extrabold text-foreground font-header mb-3">
                Grow Your Legal Practice
              </h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 max-w-sm">
                Join our premium network of legal experts. Complete your
                verification, connect with active legal seekers, and expand your
                digital reach.
              </p>
            </div>

            <Link href="/register">
              <Button
                endContent={<FaRegHandshake className="text-sm" />}
                className="bg-transparent border border-divider text-foreground font-bold px-5 py-5 rounded-none text-xs tracking-wider uppercase transition-all duration-200 group-hover:border-[#A3F367] group-hover:text-[#A3F367]"
              >
                Join as a Lawyer
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
