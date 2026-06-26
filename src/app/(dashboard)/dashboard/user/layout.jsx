import { requiredRole } from "@/core/session";

export const metadata = {
  title: "User Dashboard | LegalEase",
  description:
    "Review your hiring history, comments, and profile details on LegalEase.",
};

const UserLayout = async ({ children }) => {
  await requiredRole("user");
  return children;
};

export default UserLayout;
