import { getAnalytics } from "@/services/api";
import AnalyticsClient from "@/components/dashboard/AdminDashboard/AnalyticsClient";

export default async function AnalyticsPage() {
  let analytics = {
    totalUsers: 0,
    totalLawyers: 0,
    totalHires: 0,
    totalRevenue: 0,
  };

  try {
    const data = await getAnalytics();
    if (data?.success) {
      analytics = data.data;
    }
  } catch (err) {
    console.error(err);
  }

  return <AnalyticsClient analytics={analytics} />;
}
