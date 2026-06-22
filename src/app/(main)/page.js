"use client";

import { useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useUserSession } from "@/core/session-client";
import { toast } from "sonner";
import HeroBanner from "@/components/home/HeroBanner";
import RoleModal from "@/components/home/RoleModal";
import RoleRedirector from "@/components/home/RoleRedirector";
import TopExperts from "@/components/home/TopExperts";
import LegalCategories from "@/components/home/LegalCategories";
import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import TopLawyers from "@/components/home/FeaturedLawyers";
import FeaturedLawyers from "@/components/home/FeaturedLawyers";

export default function Home() {
  const { user } = useUserSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStartedRoleSelection, setHasStartedRoleSelection] = useState(false);

  const isRoleMissing = !!user && !user.role;
  const isRoleModalOpen =
    isRoleMissing && !isSubmitting && !hasStartedRoleSelection;

  const handleRoleSelection = async (selectedRole) => {
    setHasStartedRoleSelection(true);
    setIsSubmitting(true);

    try {
      const { error } = await authClient.updateUser({
        role: selectedRole,
      });

      if (!error) {
        toast.success(`Successfully joined as a ${selectedRole}!`);

        if (selectedRole === "lawyer") {
          window.location.href = "/dashboard/lawyer";
        } else if (selectedRole === "admin") {
          window.location.href = "/dashboard/admin";
        } else {
          window.location.href = "/dashboard/user";
        }
      } else {
        toast.error(error.message || "Failed to update role");
        setHasStartedRoleSelection(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
      setHasStartedRoleSelection(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <RoleRedirector />
      </Suspense>

      <HeroBanner />
      <AboutSection />
      <FeaturedLawyers />
      <TopExperts />
      <LegalCategories />
      <CTASection />

      <RoleModal
        isOpen={isRoleModalOpen}
        isSubmitting={isSubmitting}
        onSelectRole={handleRoleSelection}
      />
    </>
  );
}
