import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { MdOutlineGavel } from "react-icons/md";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";
import { updateHiringPayment } from "@/services/actions";

export default async function PaymentSuccess({ searchParams }) {
  const { session_id, hiringId } = await searchParams;

  let session = null;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch (err) {
    console.error("Stripe session error:", err);
  }

  if (session?.payment_status === "paid" && hiringId) {
    await updateHiringPayment(
      hiringId,
      session_id,
      session.amount_total / 100,
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="h-1 w-full bg-[#A3F367]" />

        <div className="p-10 flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 bg-[#A3F367]/10 border border-[#A3F367]/30 flex items-center justify-center">
            <FaCircleCheck className="text-[#A3F367] text-2xl" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-2 text-[#A3F367] text-[10px] font-black tracking-widest uppercase mb-2">
              <MdOutlineGavel size={12} />
              <span>Payment Confirmed</span>
            </div>
            <h1 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Payment Successful
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Your payment was successful. Your hiring is now confirmed.
            </p>
          </div>

          {session?.amount_total && (
            <div className="border border-zinc-100 dark:border-zinc-800 px-6 py-3 bg-zinc-50 dark:bg-zinc-950 w-full">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                Amount Paid
              </p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">
                ${(session.amount_total / 100).toFixed(2)}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full">
            <Link href="/dashboard/user/hiring-history">
              <button className="group w-full flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:border-[#A3F367] hover:text-[#A3F367] transition-all duration-200 rounded-none">
                View My Hirings
                <FaArrowRight
                  size={10}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </button>
            </Link>
            <Link href="/browse-lawyers">
              <button className="w-full bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-black text-xs uppercase tracking-widest px-4 py-2.5 transition-all duration-200 rounded-none">
                Browse More Lawyers
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
