"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Button,
  Separator,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  SearchField,
  Spinner, 
} from "@heroui/react";

import {
  FaScaleBalanced,
  FaRightFromBracket,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import NavLink from "../ui/NavLink";
import ThemeToggle from "../ui/ThemeToggle";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-[#0A422A] text-white sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo / Site Name */}
          <Link href="/">
            <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white cursor-pointer">
              <FaScaleBalanced className="text-[#A3F367] text-2xl" />
              <h2>
                Legal<span className="text-[#A3F367]">Ease</span>
              </h2>
            </div>
          </Link>

          {/* 🔍 Global Search Bar */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-md">
            <SearchField aria-label="Search lawyers">
              <SearchField.Group className="bg-white/10 border border-white/20 px-3 py-1.5 flex items-center gap-2 focus-within:border-[#A3F367] focus-within:ring-1 focus-within:ring-[#A3F367] transition-all rounded-none">
                <FaMagnifyingGlass className="text-slate-300 shrink-0 text-sm" />
                <SearchField.Input
                  placeholder="Search lawyers by name or specialty..."
                  className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full"
                />
                <SearchField.ClearButton className="text-slate-400 hover:text-white text-xs" />
              </SearchField.Group>
            </SearchField>
          </div>

          {/* 🌐 Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 text-sm font-medium">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-lawyers">Browse Lawyers</NavLink>

            {!isPending && session && (
              <NavLink href={`/dashboard/${session.user.role}`}>
                Dashboard
              </NavLink>
            )}
          </div>

          {/* ⚡ Action Buttons & User Profile (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />

            {isPending ? (
              <div className="flex items-center justify-center min-w-20">
                <Spinner size="sm" color="current" />
              </div>
            ) : session ? (
              <div className="flex items-center gap-3">
                <AvatarRoot
                  size="sm"
                  className="w-8 h-8 rounded-full border border-[#A3F367] shrink-0"
                >
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={session.user.image}
                    alt={session.user.name}
                  />
                  <AvatarFallback className="bg-[#A3F367] text-zinc-950 font-bold">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </AvatarRoot>

                <div className="flex flex-col min-w-max max-w-45">
                  <span className="text-xs font-bold text-white truncate">
                    Hi,{" "}
                    {session.user.name
                      ? session.user.name.split(" ")[0]
                      : "User"}
                  </span>
                </div>

                <Button
                  size="sm"
                  onClick={handleLogout}
                  className="bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 rounded-none py-2 font-medium shadow-sm transition-all duration-200 cursor-pointer"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-slate-200 hover:text-[#A3F367] hover:bg-[#0A422A] rounded-none font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-bold px-5 shadow-sm transition-all duration-200 rounded-none">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* 📱 Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />

            <Button
              isIconOnly
              aria-label="Toggle Menu"
              variant="ghost"
              onClick={toggleMobileMenu}
              className="text-white hover:bg-white/10 border-none"
            >
              {isMobileMenuOpen ? (
                <HiX className="size-6" />
              ) : (
                <HiMenuAlt3 className="size-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 📱 Responsive Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#07301E] border-t border-white/10 px-4 pt-4 pb-6 space-y-4 shadow-inner animate-in fade-in slide-in-from-top duration-200">
          <div className="block md:hidden pb-2">
            <SearchField aria-label="Search lawyers">
              <SearchField.Group className="bg-white/10 border border-white/20 px-3 py-2 flex items-center gap-2 rounded-none">
                <FaMagnifyingGlass className="text-slate-300 shrink-0 text-sm" />
                <SearchField.Input
                  placeholder="Search lawyers..."
                  className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full"
                />
              </SearchField.Group>
            </SearchField>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base ${pathname === "/" ? "text-[#A3F367]" : "text-slate-200"}`}
            >
              Home
            </Link>
            <Link
              href="/browse-lawyers"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base ${pathname === "/browse-lawyers" ? "text-[#A3F367]" : "text-slate-200"}`}
            >
              Browse Lawyers
            </Link>

            {!isPending && session && (
              <Link
                href={`/dashboard/${session.user.role}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base text-slate-200 hover:text-[#A3F367]"
              >
                Dashboard ({session.user.role})
              </Link>
            )}
          </div>

          <Separator className="bg-white/10 my-4" />

          {/* Authentication inside mobile menu */}
          <div>
            {isPending ? (
              <div className="flex items-center justify-center p-4">
                <Spinner size="sm" color="current" />
              </div>
            ) : session ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <AvatarRoot size="sm">
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <AvatarFallback className="bg-[#A3F367] text-zinc-950 font-bold">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </AvatarRoot>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate max-w-50">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 rounded-none py-2 font-medium flex items-center justify-center gap-2"
                >
                  <FaRightFromBracket className="text-sm" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    className="w-full text-slate-200 hover:text-white border border-white/20 rounded-none"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-bold rounded-none">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
