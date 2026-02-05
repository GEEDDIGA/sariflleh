// Mock data generator for testing Zaad Dashboard

interface Transaction {
  id: string;
  phoneNumber: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  type: 'send' | 'receive';
}

interface Stats {
  totalTransactions: number;
  pendingTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
}

// Somali phone numbers format: +252 6X XXX XXXX
const generatePhoneNumber = (): string => {
  const prefixes = ['61', '62', '63', '65', '66', '67', '68', '69', '71', '77', '78', '79'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `+252 ${prefix} ${number.slice(0, 3)} ${number.slice(3)}`;
};

const generateAmount = (): number => {
  // Zaad typical amounts: $1 - $500
  return parseFloat((Math.random() * 500 + 1).toFixed(2));
};

const generateStatus = (): 'pending' | 'completed' | 'failed' => {
  const rand = Math.random();
  if (rand < 0.7) return 'completed'; // 70% completed
  if (rand < 0.9) return 'pending';   // 20% pending
  return 'failed';                     // 10% failed
};

const generateTimestamp = (): Date => {
  // Generate timestamps within the last 7 days
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 7);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  const timestamp = new Date(now);
  timestamp.setDate(timestamp.getDate() - daysAgo);
  timestamp.setHours(timestamp.getHours() - hoursAgo);
  timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
  
  return timestamp;
};

export const generateMockTransactions = (count: number = 20): Transaction[] => {
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    transactions.push({
      id: `tx_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      phoneNumber: generatePhoneNumber(),
      amount: generateAmount(),
      status: generateStatus(),
      timestamp: generateTimestamp(),
      type: Math.random() > 0.5 ? 'send' : 'receive'
    });
  }
  
  // Sort by timestamp (newest first)
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const generateMockStats = (transactions: Transaction[]): Stats => {
  return {
    totalTransactions: transactions.length,
    pendingTransactions: transactions.filter(t => t.status === 'pending').length,
    completedTransactions: transactions.filter(t => t.status === 'completed').length,
    failedTransactions: transactions.filter(t => t.status === 'failed').length
  };
};

// Simulate real-time transaction updates
export const createMockElectronAPI = () => {
  const transactions = generateMockTransactions(25);
  const stats = generateMockStats(transactions);
  
  return {
    getTransactions: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return transactions;
    },
    
    getStats: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return stats;
    },
    
    onTransactionUpdate: (callback: (data: any) => void) => {
      // Simulate a new transaction every 10 seconds
      const interval = setInterval(() => {
        const newTransaction: Transaction = {
          id: `tx_${Date.now()}_new_${Math.random().toString(36).substr(2, 9)}`,
          phoneNumber: generatePhoneNumber(),
          amount: generateAmount(),
          status: 'pending',
          timestamp: new Date(),
          type: 'receive'
        };
        
        transactions.unshift(newTransaction);
        callback(newTransaction);
      }, 10000);
      
      return () => clearInterval(interval);
    },
    
    sendTransaction: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, id: `tx_${Date.now()}` };
    },
    
    updateTransaction: async (id: string, data: any) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    
    deleteTransaction: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    
    removeTransactionListener: () => {
      // Cleanup would go here
    }
  };
};

// Install mock API if window.electron doesn't exist (for development)
export const installMockAPI = () => {
  if (typeof window !== 'undefined' && !window.electron) {
    console.log('🧪 Mock Electron API installed for testing');
    (window as any).electron = createMockElectronAPI();
  }
};
