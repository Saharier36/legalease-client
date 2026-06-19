"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export default function AboutSection() {
  return (
    <section className="w-full py-20 border-t border-divider bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
        >
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 flex flex-col items-start"
          >
            <span className="text-[#A3F367] text-base font-semibold tracking-wide mb-3">
              About
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-header text-foreground leading-tight pb-6 relative">
              Let Our Years of Experience be Your Guide
              <span className="absolute bottom-0 left-0 w-24 h-0.5 bg-foreground/60" />
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-7 text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4 pt-2 md:pt-9"
          >
            <p>
              LegalEase bridges the gap between top-tier verified lawyers and
              individuals or businesses seeking reliable legal services. From
              corporate compliance to contract verifications, we seamlessly
              connect you with specialized legal consultants under one secure
              digital platform.
            </p>
            <p>
              Our mission is to make professional legal counsel transparent,
              modern, and accessible to everyone. Browse, discover, and hire
              your trusted legal protector with ultimate peace of mind.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
