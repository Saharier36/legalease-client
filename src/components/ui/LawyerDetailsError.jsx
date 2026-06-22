import Link from "next/link";
import { MdOutlineGavel } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

export default function LawyerDetailsError({ message }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="border border-dashed border-red-500/30 bg-red-500/5 p-12 max-w-md w-full text-center">
        <MdOutlineGavel className="text-red-400 text-3xl mx-auto mb-4" />
        <p className="text-sm font-bold text-red-500 uppercase tracking-wider mb-1">
          {message || "Lawyer not found"}
        </p>
        <p className="text-xs text-zinc-400 mb-6">
          This profile may have been removed or the link is incorrect.
        </p>
        <Link href="/browse-lawyers">
          <button className="group flex items-center gap-2 mx-auto border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:border-[#A3F367] hover:text-[#A3F367] transition-all duration-200 rounded-none">
            Browse Lawyers
            <FaArrowRight
              size={10}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
