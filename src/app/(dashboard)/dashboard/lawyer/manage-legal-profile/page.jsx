import ManageLegalProfileClient from "@/components/dashboard/LawyerDashboard/ManageLegalProfileClient";
import { getUserSession } from "@/core/session";
import { fetchLawyerServices } from "@/services/api";

export default async function ManageLegalProfile() {
  const user = await getUserSession();

  let services = [];
  if (user?.id) {
    try {
      const result = await fetchLawyerServices(user.id);
      if (Array.isArray(result)) {
        services = result;
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ManageLegalProfileClient
      initialServices={services}
      lawyerId={user?.id}
    />
  );
}
