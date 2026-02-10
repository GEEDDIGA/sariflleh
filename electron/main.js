// electron/main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow = null;

// TEMP mock DB (replace with Firebase later)
let transactions = [
  {
    id: "tx-1",
    phone: "25263xxxxxxx",
    amount: 10,
    status: "completed",
    createdAt: Date.now() - 1000 * 60 * 10
  },
  {
    id: "tx-2",
    phone: "25261xxxxxxx",
    amount: 5,
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 4
  },
  {
    id: "tx-3",
    phone: "25265xxxxxxx",
    amount: 25,
    status: "failed",
    createdAt: Date.now() - 1000 * 60 * 2
  }
];

function calculateStats() {
  const total = transactions.length;
  const completed = transactions.filter(t => t.status === "completed").length;
  const pending = transactions.filter(t => t.status === "pending").length;
  const failed = transactions.filter(t => t.status === "failed").length;

  return { total, completed, pending, failed };
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle("get-transactions", async () => {
  return transactions;
});

ipcMain.handle("get-stats", async () => {
  return calculateStats();
});

// Simulate live updates every 20s
setInterval(() => {
  if (!mainWindow) return;

  const newTx = {
    id: `tx-${Date.now()}`,
    phone: "2526xxxxxxx",
    amount: Math.round(Math.random() * 50),
    status: Math.random() > 0.7 ? "failed" : "completed",
    createdAt: Date.now()
  };
  transactions = [newTx, ...transactions].slice(0, 50);
  const stats = calculateStats();

  mainWindow.webContents.send("transaction-update", {
    type: "new-transaction",
    transaction: newTx,
    stats
  });
}, 20000);
