# Zaad Desktop Dashboard

**Maamulka Sarrifka Automatic-ga ah** (Automatic Money Transfer Management System)

A hybrid Electron desktop application for monitoring and managing Zaad mobile money transactions. This dashboard works in conjunction with a Flutter mobile app that handles SMS automation for Zaad transfers.

## 🎯 Project Overview

This project is part of a hybrid solution:
- **Desktop Dashboard** (this repository): Monitor transactions, view statistics, and manage the automation system
- **Flutter Mobile App** (coming soon): Intercept SMS messages, automate Zaad USSD calls, and sync with Firebase

## ✨ Features

### Current Features
- 📊 Real-time transaction monitoring dashboard
- 📈 Transaction statistics (Total, Pending, Completed, Failed)
- 🔄 Live updates from mobile app via Firebase
- 💻 Cross-platform desktop app (Windows, macOS, Linux)
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 🔒 Secure IPC communication between Electron and React

### Upcoming Features
- 🔥 Firebase Realtime Database integration
- 📱 Mobile app synchronization
- 📧 Transaction notifications
- 📝 Transaction history export
- 🔍 Advanced filtering and search
- 📊 Analytics and reporting

## 🛠️ Tech Stack

- **Framework**: Electron 28.x
- **Frontend**: React 19.x + TypeScript
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Build Tool**: Vite 6.x
- **Database**: Firebase (planned)
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- Git

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/GEEDDIGA/sariflleh.git
cd sariflleh
```

### 2. Install dependencies
```bash
pnpm install
# or
npm install
```

### 3. Development Mode

#### Run as web app (for testing UI)
```bash
pnpm dev
```
Open http://localhost:5173

#### Run as Electron desktop app
```bash
pnpm electron:dev
```
This will start both Vite dev server and Electron window.

### 4. Build for Production

#### Build the React app
```bash
pnpm build
```

#### Build Electron app for your platform
```bash
pnpm electron:build
```

The built application will be in the `dist-electron` directory.

## 📁 Project Structure

```
sariflleh/
├── electron/                 # Electron main process files
│   ├── main.js              # Main Electron process
│   └── preload.js           # Preload script (IPC bridge)
├── src/
│   ├── components/          # React components
│   │   └── ui/             # shadcn/ui components
│   ├── pages/
│   │   └── Index.tsx       # Main dashboard page
│   ├── App.tsx
│   └── main.tsx
├── public/                  # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 🔧 Configuration

### Firebase Setup (Coming Soon)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Realtime Database
3. Add your Firebase configuration to the project
4. Update security rules for mobile app access

## 🔌 IPC Communication

The desktop app uses Electron IPC for secure communication between the main process and renderer:

```typescript
// Available APIs in renderer process
window.electron.getTransactions()      // Fetch all transactions
window.electron.getStats()            // Get transaction statistics  
window.electron.onTransactionUpdate() // Listen for real-time updates
```

## 📱 Mobile App Integration

The Flutter mobile app (separate repository) will:
1. Intercept Zaad SMS messages
2. Parse transaction details
3. Execute USSD calls for automated responses
4. Sync all data to Firebase Realtime Database
5. Notify desktop app of updates

## 🐛 Troubleshooting

### Issue: Electron window doesn't open
- Make sure port 5173 is not in use
- Try running `pnpm dev` first to verify Vite works
- Check console for errors

### Issue: Components not rendering
- Verify all shadcn/ui components are properly installed
- Run `pnpm install` again

### Issue: Build fails
- Clear node_modules and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Make sure you're using Node.js 18+

## 📝 Development Notes

- The app uses CommonJS for Electron files and ESM for React
- IPC communication is secured with context isolation
- Firebase integration is planned but not yet implemented
- Mobile app repository link will be added when ready

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👤 Author

GEEDDIGA

## 🔗 Links

- Desktop Dashboard: https://github.com/GEEDDIGA/sariflleh
- Mobile App: *Coming soon*
- Live Demo: https://sariflleh.vercel.app/ (web version)

---

**Note**: This is an active development project. The mobile app component and Firebase integration are being developed separately.
