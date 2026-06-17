"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Button,
  Dropdown,
  Header,
  Separator,
  Label,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  SearchField,
} from "@heroui/react";

import {
  FaScaleBalanced,
  FaUser,
  FaGauge,
  FaRightFromBracket,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import NavLink from "../ui/NavLink";
import ThemeToggle from "../ui/ThemeToggle";


const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPending = false;
  const session = null;

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-[#0A422A] text-white shadow-lg sticky top-0 z-50 transition-colors duration-300">
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

          {/* 🔍 Global Search Bar (HeroUI Anatomy using React Icons) */}
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
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-lawyers">Browse Lawyers</NavLink>
          </div>

          {/* ⚡ Action Buttons & User Profile (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* ☀️/🌙 Theme Toggle (Desktop) */}
            <ThemeToggle />

            {!isPending && session ? (
              <Dropdown>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-1 rounded-full border border-white/20 hover:bg-white/10 text-white"
                >
                  <AvatarRoot
                    size="sm"
                    className="w-8 h-8 rounded-full border border-[#A3F367]"
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
                  <span className="text-sm font-medium pr-2 text-slate-200">
                    {session.user.name}
                  </span>
                </Button>

                <Dropdown.Popover className="min-w-56 z-9999 bg-zinc-900 border border-zinc-800 text-white rounded-xl shadow-xl">
                  <Dropdown.Menu>
                    <Dropdown.Section>
                      <Header>
                        <div className="flex flex-col py-2 px-3 bg-zinc-950/40 rounded-t-lg">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400">
                            Signed in as ({session.user.role})
                          </span>
                          <span className="text-sm font-bold text-white truncate">
                            {session.user.name}
                          </span>
                          <span className="text-xs text-slate-400 truncate">
                            {session.user.email}
                          </span>
                        </div>
                      </Header>
                    </Dropdown.Section>
                    <Separator className="bg-zinc-800" />

                    {/* Role-based Dashboard Dropdown Link */}
                    <Dropdown.Section className="p-1">
                      <Dropdown.Item href={`/dashboard/${session.user.role}`}>
                        <div className="flex items-center gap-2 py-1 px-2 text-slate-200 hover:text-[#A3F367]">
                          <FaGauge className="shrink-0 text-sm" />
                          <Label className="cursor-pointer">My Dashboard</Label>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Section>

                    <Separator className="bg-zinc-800" />
                    <Dropdown.Section className="p-1">
                      <Dropdown.Item variant="danger">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-left bg-transparent border-none cursor-pointer text-rose-400 hover:text-rose-300 focus:outline-none py-1 px-2"
                        >
                          <FaRightFromBracket className="shrink-0 text-sm" />
                          <Label className="cursor-pointer">Logout</Label>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Section>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
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
                <Link href="/sign-up">
                  <Button className="bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-bold px-5 shadow-sm transition-all duration-200 rounded-none">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* 📱 Mobile Menu Button (Hamburger Icon) */}
          <div className="lg:hidden flex items-center gap-2">
            {/* ☀️/🌙 Theme Toggle */}
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
          {/* Search bar inside mobile menu */}
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

            {session && (
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
            {session ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <AvatarRoot size="sm">
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <AvatarFallback className="bg-[#A3F367] text-zinc-950 font-bold">
                      U
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
                  href="/sign-up"
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
