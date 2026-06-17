"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaChevronRight,
} from "react-icons/fa6";
import Image from "next/image";

const SLIDE_DATA = [
  {
    id: 1,
    title: "Your Trusted Path to Expert Legal Counsel",
    description:
      "LegalEase bridges the gap between top-tier verified lawyers and individuals or businesses seeking reliable legal services. Browse, discover, and hire your legal protector today.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    buttonText: "Browse Lawyers",
    buttonLink: "/browse-lawyers",
    stats: [
      { value: "4,500+", label: "Verified Experts" },
      { value: "52k+", label: "Cases Resolved" },
      { value: "$4m+", label: "Legal Costs Saved" },
    ],
  },
  {
    id: 2,
    title: "Streamlined Services For Modern Businesses",
    description:
      "From corporate compliance to contract verifications, seamlessly connect with specialized legal consultants. Manage all your legal needs under one secure digital platform.",
    image:
      "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=800&q=80",
    buttonText: "Find Consultants",
    buttonLink: "/browse-lawyers",
    stats: [
      { value: "1,200+", label: "Corporate Clients" },
      { value: "98%", label: "Success Rate" },
      { value: "24/7", label: "Legal Support" },
    ],
  },
  {
    id: 3,
    title: "Grow Your Legal Practice",
    description:
      "Are you a talented lawyer? Secure your spot, complete our hassle-free one-time verification payment, and unlock a massive network of active legal seekers today.",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80",
    buttonText: "Join as a Lawyer",
    buttonLink: "/sign-up",
    stats: [
      { value: "15k+", label: "Consultations Provided" },
      { value: "100%", label: "Verified Profiles" },
      { value: "15M+", label: "Platform Visits" },
    ],
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#0A422A] text-white overflow-hidden py-12 lg:py-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative min-h-150 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* 📝 Left Side: Content Area */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                {SLIDE_DATA[currentSlide].title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed font-light">
                {SLIDE_DATA[currentSlide].description}
              </p>

              <div className="mb-12 lg:mb-16">
                <Link href={SLIDE_DATA[currentSlide].buttonLink}>
                  <Button
                    endContent={<FaChevronRight className="text-xs shrink-0" />}
                    className="bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-bold px-6 py-6 rounded-none text-base shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    {SLIDE_DATA[currentSlide].buttonText}
                  </Button>
                </Link>
              </div>

              {/* 📊 Stats Section */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/10 pt-8 max-w-lg">
                {SLIDE_DATA[currentSlide].stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🖼️ Right Side: Image Area */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="w-full max-w-112.5 aspect-square relative border-4 border-white/5 shadow-2xl overflow-hidden group"
              >
                {/* Next.js Optimized Image */}
                <Image
                  src={SLIDE_DATA[currentSlide].image}
                  alt={SLIDE_DATA[currentSlide].title}
                  fill
                  sizes="(max-w-7xl) 100vw, 450px"
                  priority={currentSlide === 0} 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />


                <div className="absolute inset-0 bg-linear-to-t from-[#0A422A]/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 🎛️ Slider Navigation Dots */}
        <div className="absolute bottom-0 left-4 sm:left-6 lg:left-8 flex gap-4 z-10">
          {SLIDE_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all duration-300 ${
                i === currentSlide
                  ? "w-8 bg-[#A3F367]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
