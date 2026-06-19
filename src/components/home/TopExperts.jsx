"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FaChevronRight, FaCheckCircle } from "react-icons/fa";

const STATIC_LAWYERS = [
  {
    id: "lawyer_1",
    name: "Harvey S. Vance",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
    hires: 342,
  },
  {
    id: "lawyer_2",
    name: "Eleanor Finch",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    hires: 298,
  },
  {
    id: "lawyer_3",
    name: "Alistair Sterling",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    hires: 275,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function TopExperts() {
  return (
    <section className="w-full py-16 border-t border-divider bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-header text-foreground">
              Top Legal Experts
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-light">
              Our platform&apos;s most hired and trusted legal professionals.
            </p>
          </div>

          <Link href="/browse-lawyers">
            <Button
              variant="light"
              endContent={<FaChevronRight className="text-[10px]" />}
              className="text-[#A3F367] hover:bg-[#A3F367]/10 font-bold px-3 py-1 text-xs rounded-none transition-all duration-200"
            >
              View All
            </Button>
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {STATIC_LAWYERS.map((lawyer) => (
            <Link
              href={`/lawyer/${lawyer.id}`}
              key={lawyer.id}
              className="block group"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 p-4 border border-divider hover:border-[#A3F367]/40 bg-content1/30 rounded-none transition-all duration-200"
              >
                <div className="w-14 h-14 relative rounded-full overflow-hidden border border-divider group-hover:border-[#A3F367]/50 shrink-0 transition-colors duration-200">
                  <Image
                    src={lawyer.avatar}
                    alt={lawyer.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-foreground truncate group-hover:text-[#A3F367] transition-colors duration-150">
                      {lawyer.name}
                    </h3>
                    <FaCheckCircle
                      className="text-[#A3F367] size-3.5 shrink-0"
                      title="Verified Expert"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-semibold text-foreground">
                      {lawyer.hires}
                    </span>{" "}
                    Successful Hires
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
