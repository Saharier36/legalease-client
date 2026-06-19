"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import HeroBanner from "@/components/home/HeroBanner";
import RoleModal from "@/components/home/RoleModal";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isRoleUpdated, setIsRoleUpdated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("role_updated") === "true";
    }
    return false;
  });

  useEffect(() => {
    const shouldRedirect = searchParams.get("redirect") === "true";

    if (shouldRedirect && session?.user?.role) {
      const userRole = session.user.role;
      if (userRole === "lawyer" || userRole === "admin") {
        router.replace(`/dashboard/${userRole}`);
      }
    }
  }, [session, router, searchParams]);

  useEffect(() => {
    if (session?.user?.role && typeof window !== "undefined") {
      sessionStorage.removeItem("role_updated");
    }
  }, [session]);

  const isRoleMissing =
    !!(session?.user && !session.user.role) && !isRoleUpdated && !isSubmitting;

  const handleRoleSelection = async (selectedRole) => {
    setIsSubmitting(true);
    try {
      const { error } = await authClient.updateUser({
        role: selectedRole,
      });

      if (!error) {
        toast.success(`Successfully joined as a ${selectedRole}!`);

        if (typeof window !== "undefined") {
          sessionStorage.setItem("role_updated", "true");
        }
        setIsRoleUpdated(true);

        if (selectedRole === "lawyer") {
          return router.replace("/dashboard/lawyer");
        } else if (typeof authClient.session?.reload === "function") {
          await authClient.session.reload();
        }
      } else {
        toast.error(error.message || "Failed to update role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeroBanner />

      <RoleModal
        isOpen={isRoleMissing}
        isSubmitting={isSubmitting}
        onSelectRole={handleRoleSelection}
      />
    </>
  );
}
