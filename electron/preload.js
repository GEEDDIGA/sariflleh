// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getTransactions: () => ipcRenderer.invoke("get-transactions"),
  getStats: () => ipcRenderer.invoke("get-stats"),
  onTransactionUpdate: (callback) => {
    if (typeof callback !== "function") return;

    const listener = (_event, payload) => {
      callback(payload);
    };

    ipcRenderer.on("transaction-update", listener);

    // return unsubscribe
    return () => {
      ipcRenderer.removeListener("transaction-update", listener);
    };
  }
});
