import { getUserSession } from "@/core/session";
import { getUserComments } from "@/services/api";
import UserCommentsClient from "@/components/dashboard/UserDashboard/UserCommentsClient";

export default async function UserComments() {
  const user = await getUserSession();

  let comments = [];
  try {
    const data = await getUserComments(user?.id);
    if (data?.success) {
      comments = data.data;
    }
  } catch (err) {
    console.error(err);
  }

  return <UserCommentsClient comments={comments} userId={user?.id} />;
}
