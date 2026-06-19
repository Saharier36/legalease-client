"use client";

import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import HeroBanner from "@/components/home/HeroBanner";
import RoleModal from "@/components/home/RoleModal";

export default function Home() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isRoleUpdated, setIsRoleUpdated] = useState(false);

  const isRoleMissing =
    !!(session?.user && !session.user.role) && !isRoleUpdated;

  const handleRoleSelection = async (selectedRole) => {
    setIsSubmitting(true);
    try {
      const { error } = await authClient.updateUser({
        role: selectedRole,
      });

      if (!error) {
        toast.success(`Successfully joined as a ${selectedRole}!`);
        setIsRoleUpdated(true);

        if (typeof authClient.session?.reload === "function") {
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
