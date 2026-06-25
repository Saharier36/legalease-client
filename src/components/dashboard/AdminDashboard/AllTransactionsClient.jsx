"use client";

export default function AllTransactionsClient({ transactions }) {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            All Transactions
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
            View all platform payment records including Stripe transaction IDs,
            amounts, and dates.
          </p>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/10">
            <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">
              No Transactions Yet
            </p>
          </div>
        ) : (
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="h-1 w-full bg-[#A3F367]" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Transaction ID
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      User Email
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Amount
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr
                      key={t._id}
                      className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors"
                    >
                      <td className="px-6 py-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 max-w-xs truncate">
                        {t.paymentIntentId || t.stripeSessionId || "—"}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 text-xs">
                        {t.userEmail || "—"}
                      </td>
                      <td className="px-6 py-4 text-zinc-900 dark:text-white text-xs font-bold">
                        ${t.amount}
                      </td>
                      <td className="px-6 py-4 text-zinc-400 text-xs whitespace-nowrap">
                        {t.createdAt
                          ? new Date(t.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
