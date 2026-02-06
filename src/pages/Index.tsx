// src/pages/Index.tsx
import { useEffect, useState } from "react";

type Stats = {
  total: number;
  completed: number;
  pending: number;
  failed: number;
};

export default function IndexPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | void;

    async function loadInitial() {
      try {
        const [txs, s] = await Promise.all([
          window.electron.getTransactions(),
          window.electron.getStats()
        ]);
        setTransactions(txs);
        setStats(s);
      } finally {
        setLoading(false);
      }
    }

    loadInitial();

    unsubscribe = window.electron.onTransactionUpdate?.((payload) => {
      if (payload.transaction) {
        setTransactions((prev) => [payload.transaction!, ...prev]);
      }
      if (payload.stats) {
        setStats(payload.stats);
      }
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
        <p className="text-lg">Loading Zaad dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Zaad Desktop Dashboard</h1>
        <span className="text-xs text-slate-400">
          Sarrif Automatic • Hargeysa
        </span>
      </header>

      <main className="px-6 py-6 space-y-6">
        {stats && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Completed" value={stats.completed} />
            <StatCard label="Pending" value={stats.pending} />
            <StatCard label="Failed" value={stats.failed} />
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold mb-3">
            Live Transactions (Mock)
          </h2>
          <div className="rounded-lg border border-slate-800 bg-slate-900/40 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/80">
                <tr>
                  <th className="text-left px-4 py-2 border-b border-slate-800">
                    ID
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-800">
                    Phone
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-800">
                    Amount
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-800">
                    Status
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-800">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-900/60">
                    <td className="px-4 py-2 border-b border-slate-900">
                      {tx.id}
                    </td>
                    <td className="px-4 py-2 border-b border-slate-900">
                      {tx.phone}
                    </td>
                    <td className="px-4 py-2 border-b border-slate-900">
                      {tx.amount} $
                    </td>
                    <td className="px-4 py-2 border-b border-slate-900">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-4 py-2 border-b border-slate-900">
                      {new Date(tx.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-slate-400"
                    >
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-3">
      <p className="text-xs uppercase text-slate-400">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Transaction["status"] }) {
  const colors: Record<Transaction["status"], string> = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    failed: "bg-rose-500/10 text-rose-400 border-rose-500/30"
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs capitalize ${colors[status]}`}
    >
      {status}
    </span>
  );
}
