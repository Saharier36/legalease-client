"use client";

import React from "react";
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center space-y-4 bg-background">
      <Spinner size="lg" color="current" className="text-[#A3F367]" />
    </div>
  );
}
