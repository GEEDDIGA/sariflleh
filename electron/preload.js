const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Transactions API
  getTransactions: () => ipcRenderer.invoke('get-transactions'),
  
  // Stats API  
  getStats: () => ipcRenderer.invoke('get-stats'),
  
  // Future APIs for Zaad automation
  sendTransaction: (data) => ipcRenderer.invoke('send-transaction', data),
  updateTransaction: (id, data) => ipcRenderer.invoke('update-transaction', id, data),
  deleteTransaction: (id) => ipcRenderer.invoke('delete-transaction', id),
  
  // Listen for real-time updates from mobile app
  onTransactionUpdate: (callback) => {
    ipcRenderer.on('transaction-update', (event, data) => callback(data));
  },
  
  // Remove listener
  removeTransactionListener: (callback) => {
    ipcRenderer.removeListener('transaction-update', callback);
  }
});
