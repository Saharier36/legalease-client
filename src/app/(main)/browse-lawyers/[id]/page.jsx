import { getLawyerById } from "@/services/lawyers/lawyerQueries";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LawyerDetailsError from "@/components/ui/LawyerDetailsError";
import LawyerDetailsClient from "@/components/ui/LawyerDetailsClient";


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
  let user = null;
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    user = session?.user || null;
  } catch (err) {
    user = null;
  }

  return <LawyerDetailsClient lawyer={lawyer} user={user} />;
}
