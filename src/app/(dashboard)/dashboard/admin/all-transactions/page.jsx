import { getUserSession } from "@/core/session";
import { getTransactions } from "@/services/api";
import AllTransactionsClient from "@/components/dashboard/AdminDashboard/AllTransactionsClient";

export default async function AllTransactions() {
  let transactions = [];
  try {
    const data = await getTransactions();
    if (data?.success) {
      transactions = data.data;
    }
  } catch (err) {
    console.error(err);
  }

  return <AllTransactionsClient transactions={transactions} />;
}
