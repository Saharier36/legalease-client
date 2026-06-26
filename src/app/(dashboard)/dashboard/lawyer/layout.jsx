import { requiredRole } from "@/core/session";

export const metadata = {
  title: "Lawyer Dashboard | LegalEase",
  description:
    "Manage your lawyer profile, services, and client hirings within LegalEase.",
};

const LawyerLayout = async ({ children }) => {
  await requiredRole("lawyer");
  return children;
};

export default LawyerLayout;
