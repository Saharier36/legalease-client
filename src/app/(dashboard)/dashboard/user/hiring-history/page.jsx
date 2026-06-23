import UserHiringClient from "@/components/dashboard/UserDashboard/UserHiringClient";
import { getUserSession } from "@/core/session";
import { getHirings } from "@/services/api";

export default async function UserHiringHistory() {
  const user = await getUserSession();

  let hirings = [];
  try {
    const data = await getHirings({ userId: user?.id });
    if (data?.success) {
      hirings = data.data;
    }
  } catch (err) {
    console.error(err);
  }

  return <UserHiringClient hirings={hirings} />;
}
