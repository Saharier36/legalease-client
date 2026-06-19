"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function RoleRedirector() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldRedirect = searchParams.get("redirect") === "true";

    if (shouldRedirect && session?.user?.role) {
      const userRole = session.user.role;
      if (userRole === "lawyer" || userRole === "admin") {
        router.replace(`/dashboard/${userRole}`);
      }
    }
  }, [session, router, searchParams]);

  return null;
}
