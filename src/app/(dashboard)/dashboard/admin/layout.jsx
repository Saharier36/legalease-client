import { requiredRole } from "@/core/session";

export const metadata = {
  title: "Admin Dashboard | LegalEase",
  description:
    "Admin tools for managing users, transactions, and analytics across the LegalEase platform.",
};

const AdminLayout = async ({ children }) => {
  await requiredRole("admin");
  return children;
};

export default AdminLayout;
