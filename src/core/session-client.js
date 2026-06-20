"use client";

import { useSession } from "@/lib/auth-client";

export const useUserSession = () => {
  const { data: session, isPending, error } = useSession();
  return {
    user: session?.user || null,
    session: session || null,
    isPending,
    error,
  };
};
