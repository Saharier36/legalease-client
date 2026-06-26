"use client";

import React from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPaperPlane,
  FaScaleBalanced,
} from "react-icons/fa6";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to LegalEase Newsletter!");
  };

  return (
    <footer className="w-full bg-[#0A422A] text-slate-300 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Column 1: Brand & About (4 Blocks) */}
          <div className="md:col-span-4 flex flex-col gap-4">
          
            <div className="flex items-center gap-2">

            <FaScaleBalanced className="text-[#A3F367] text-2xl" />
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Legal<span className="text-[#A3F367]">Ease</span>
            </h3>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-light">
              Connecting legal seekers, clients, and modern businesses with
              trusted, verified legal experts seamlessly. Manage your council
              securely in one premium platform.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-2">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaLinkedinIn />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm text-slate-300 hover:text-[#A3F367] hover:bg-white/10 hover:border-[#A3F367]/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (4 Blocks) */}
          <div className="md:col-span-4 md:pl-12 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold text-base mb-4 tracking-wide">
                Platform
              </h4>
              <ul className="space-y-2.5 text-sm font-light">
                <li>
                  <Link
                    href="/browse-lawyers"
                    className="hover:text-[#A3F367] transition-colors"
                  >
                    Browse Lawyers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-[#A3F367] transition-colors"
                  >
                    Legal Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-[#A3F367] transition-colors"
                  >
                    Join as Lawyer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-4 tracking-wide">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm font-light">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#A3F367] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#A3F367] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-[#A3F367] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter Signup (4 Blocks) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Subscribe to Newsletter
            </h4>
            <p className="text-sm text-slate-400 font-light">
              Stay updated with legal insights and platform features.
            </p>
       
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-stretch w-full mt-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                required
                variant="bordered"
                size="sm"
                className="text-white font-light bg-white/5 rounded-none border border-white/10 border-r-0 focus-within:border-[#A3F367]/50 w-full"
              />
              <Button
                type="submit"
                isIconOnly
                className="bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 rounded-none shrink-0 h-full px-5"
              >
                <FaPaperPlane className="text-sm" />
              </Button>
            </form>
          </div>
        </div>

        {/* 🔒 Bottom Section: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-light">
          <div>
            &copy; {currentYear}{" "}
            <span className="text-slate-400 font-normal">LegalEase</span>. All
            rights reserved.
          </div>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-slate-300 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
