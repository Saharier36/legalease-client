"use client";

import { useEffect } from "react";
import { useUserSession } from "@/core/session-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function RoleRedirector() {
  const { user } = useUserSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldRedirect = searchParams.get("redirect") === "true";

    if (shouldRedirect && user?.role) {
      const userRole = user.role;
      if (userRole === "lawyer" || userRole === "admin") {
        router.replace(`/dashboard/${userRole}`);
      }
    }
  }, [user, router, searchParams]);

  return null;
}
