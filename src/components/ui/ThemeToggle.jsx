"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FaSun, FaMoon } from "react-icons/fa6";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {

    return <div className="w-10 h-10 rounded-full bg-white/5" />;
  }

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-slate-200 hover:text-[#A3F367] hover:bg-white/20 hover:border-[#A3F367]/40 shadow-lg transition-all duration-300 flex items-center justify-center text-base"
    >
      {theme === "dark" ? (
        <FaSun className="animate-spin-slow text-amber-400" />
      ) : (
        <FaMoon className="text-indigo-200" />
      )}
    </Button>
  );
}
