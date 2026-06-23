import LawyerDetailsError from "@/components/ui/LawyerDetailsError";
import LawyerDetailsClient from "@/components/ui/LawyerDetailsClient";
import { checkHiring, getLawyerById } from "@/services/api";
import { getUserSession } from "@/core/session";

export default async function LawyerDetails({ params }) {
  const { id } = await params;

  // Fetch lawyer
  let lawyer = null;
  try {
    lawyer = await getLawyerById(id);
  } catch (err) {
    console.error(err);
  }

  if (!lawyer || lawyer.error) {
    return <LawyerDetailsError message="Lawyer not found" />;
  }

  // Get session
  const user = await getUserSession();
  
  // hasPaid check
  let hasPaid = false;
  if (user) {
    try {
      const data = await checkHiring(lawyer._id, user.id);
      hasPaid = data.hasPaid || false;
    } catch (err) {
      hasPaid = false;
    }
  }

  return <LawyerDetailsClient lawyer={lawyer} user={user} hasPaid={hasPaid} />;
}
