import { getUserSession } from "@/core/session";
import { getUsers } from "@/services/api";
import ManageUsersClient from "@/components/dashboard/AdminDashboard/ManageUsersClient";

export default async function ManageUsers() {
  const admin = await getUserSession();

  let users = [];
  try {
    const data = await getUsers();
    if (data?.success) {
      users = data.data;
    }
  } catch (err) {
    console.error(err);
  }

  return <ManageUsersClient users={users} currentUserId={admin?.id} />;
}
