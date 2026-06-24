"use client";

import React, { useEffect } from "react";
import { Button, Card } from "@heroui/react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 bg-background text-foreground">
      <Card className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 text-center space-y-6 shadow-xl">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-red-500">
            Execution Fault
          </p>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Something Went Wrong
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            An unexpected error occurred while processing this operation.
          </p>
        </div>
        <Button
          onClick={() => reset()}
          size="md"
          className="w-full rounded-none font-black uppercase text-[11px] tracking-widest h-10 text-black shadow-md"
          style={{ backgroundColor: "#A3F367" }}
        >
          Try Again
        </Button>
      </Card>
    </div>
  );
}
