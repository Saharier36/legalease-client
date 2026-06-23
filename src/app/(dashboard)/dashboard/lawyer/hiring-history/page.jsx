import LawyerHiringClient from "@/components/dashboard/LawyerDashboard/LawyerHiringClient";
import { getUserSession } from "@/core/session";
import { getHirings } from "@/services/api";

export default async function LawyerHiringHistory() {
  const user = await getUserSession();

  let hirings = [];
  try {
    const data = await getHirings({ lawyerId: user?.id });
    if (data?.success) {
      hirings = data.data;
    }
  } catch (err) {
    console.error(err);
  }

  return <LawyerHiringClient hirings={hirings} lawyerId={user?.id} />;
}
