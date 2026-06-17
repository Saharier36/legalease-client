"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-colors duration-200 font-medium text-sm ${
        isActive
          ? "text-[#A3F367] font-semibold"
          : "text-slate-200 hover:text-[#A3F367]"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
