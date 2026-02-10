// src/global.d.ts
export {};

declare global {
  interface Transaction {
    id: string;
    phone: string;
    amount: number;
    status: "pending" | "completed" | "failed";
    createdAt: number;
  }

  interface ElectronAPI {
    getTransactions: () => Promise<Transaction[]>;
    getStats: () => Promise<{
      total: number;
      completed: number;
      pending: number;
      failed: number;
    }>;
    onTransactionUpdate: (
      cb: (payload: {
        type: string;
        transaction?: Transaction;
        stats?: {
          total: number;
          completed: number;
          pending: number;
          failed: number;
        };
      }) => void
    ) => (() => void) | void;
  }

  interface Window {
    electron: ElectronAPI;
  }
}
