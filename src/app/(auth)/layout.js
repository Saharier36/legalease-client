import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#0A422A] text-white font-body flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md z-10">{children}</div>
    </div>
  );
}
