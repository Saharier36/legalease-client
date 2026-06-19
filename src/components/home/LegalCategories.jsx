"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGavel,
  FaBriefcase,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaHome,
} from "react-icons/fa";

const STATIC_CATEGORIES = [
  {
    id: "cat_criminal",
    name: "Criminal Defense",
    slug: "criminal",
    icon: FaGavel,
    count: "1,240+ Lawyers",
  },
  {
    id: "cat_corporate",
    name: "Corporate & Business",
    slug: "corporate",
    icon: FaBriefcase,
    count: "850+ Consultants",
  },
  {
    id: "cat_family",
    name: "Family & Divorce",
    slug: "family",
    icon: FaUsers,
    count: "930+ Experts",
  },
  {
    id: "cat_ip",
    name: "Intellectual Property",
    slug: "intellectual-property",
    icon: FaLightbulb,
    count: "410+ Specialists",
  },
  {
    id: "cat_cyber",
    name: "Cyber & IT Law",
    slug: "cyber-it",
    icon: FaShieldAlt,
    count: "320+ Experts",
  },
  {
    id: "cat_property",
    name: "Real Estate & Property",
    slug: "real-estate",
    icon: FaHome,
    count: "670+ Lawyers",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function LegalCategories() {
  return (
    <section className="w-full py-16 border-t border-divider bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-header text-foreground">
            Explore Legal Categories
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-light">
            Find specialized legal professionals tailored to your specific case
            requirements.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {STATIC_CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                href={`/browse-lawyers?category=${category.slug}`}
                key={category.id}
                className="block group"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-5 border border-divider hover:border-[#A3F367]/40 bg-content1/30 rounded-none transition-all duration-200"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-content2 border border-divider text-muted-foreground group-hover:text-zinc-950 group-hover:bg-[#A3F367] group-hover:border-[#A3F367] transition-all duration-300 shrink-0">
                    <IconComponent className="size-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-foreground truncate group-hover:text-[#A3F367] transition-colors duration-150">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {category.count}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
