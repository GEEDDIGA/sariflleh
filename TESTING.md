# 🧪 Testing Guide for Zaad Desktop Dashboard

This guide will help you test the Zaad Dashboard with mock data to see how it will look with real transactions.

## ✅ What's Been Set Up

We've added a **mock data generator** that simulates:
- ✨ 25 realistic Zaad transactions
- 📱 Somali phone numbers (+252 format)
- 💵 Realistic amounts ($1-$500)
- 📊 Status distribution: 70% completed, 20% pending, 10% failed
- 🕐 Timestamps from the last 7 days
- 🔄 Real-time transaction updates (new transaction every 10 seconds)

## 🚀 Quick Start Testing

### Method 1: Test as Web App (Easiest)

1. **Clone and install** (if you haven't already):
   ```bash
   git clone https://github.com/GEEDDIGA/sariflleh.git
   cd sariflleh
   pnpm install
   ```

2. **Run the dev server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser** to http://localhost:5173

4. **You should immediately see**:
   - 📊 **Stats Cards** showing:
     - Total: 25 transactions
     - Pending: ~5 transactions
     - Completed: ~17 transactions
     - Failed: ~2-3 transactions
   - 📝 **Transaction List** with 25 mock transactions
   - 🟢 **Green badges** for completed
     - 🟡 **Yellow badges** for pending
   - 🔴 **Red badges** for failed
   - 📱 **Somali phone numbers** (+252 6X XXX XXXX)
   - 💰 **Dollar amounts**
   - 🕐 **Relative timestamps** ("2 hours ago", "yesterday", etc.)

5. **Watch for real-time updates**:
   - Every 10 seconds, a new transaction will appear at the top
   - The stats will update automatically
   - Check the browser console - you'll see: `🧪 Mock Electron API installed for testing`

### Method 2: Test as Electron Desktop App

1. **Run Electron in development mode**:
   ```bash
   pnpm electron:dev
   ```

2. **You'll see**:
   - A native desktop window opens
   - Same mock data as the web version
   - Electron DevTools (automatically opened in dev mode)

## 🎯 What to Test

### Visual Elements
- [ ] Dashboard loads with gradient blue background
- [ ] 4 stats cards display at the top
- [ ] Icons render correctly (Activity, Clock, CheckCircle, XCircle)
- [ ] Transaction list shows 25 items initially
- [ ] Status badges have correct colors:
  - Green for "completed"
  - Yellow for "pending"
  - Red for "failed"
- [ ] Phone numbers are formatted correctly (+252 format)
- [ ] Amounts are displayed with $ sign
- [ ] Timestamps show relative times

### Interactive Features
- [ ] Click on **"All"** tab - shows all 25 transactions
- [ ] Click on **"Pending"** tab - shows only pending transactions (~5)
- [ ] Click on **"Completed"** tab - shows only completed (~17)
- [ ] Click on **"Failed"** tab - shows only failed (~2-3)
- [ ] Scroll through the transaction list
- [ ] Wait 10 seconds - a new transaction appears at the top
- [ ] Stats cards update automatically

### Performance
- [ ] Dashboard loads quickly (< 1 second)
- [ ] No console errors
- [ ] Smooth scrolling
- [ ] Responsive UI (try resizing window)

## 🔍 Advanced Testing

### Check Mock Data in Console

Open browser DevTools (F12) and type:

```javascript
// Get all transactions
await window.electron.getTransactions()

// Get stats
await window.electron.getStats()
```

### Verify Mock Data Generation

The mock data generator (`src/lib/mockData.ts`) creates:
- Randomized Somali phone numbers
- Amounts between $1 and $500
- Realistic status distribution
- Timestamps within the last 7 days

### Test Real-time Updates

1. Keep the dashboard open for 10 seconds
2. A new transaction should appear at the top
3. The "Pending" count in stats should increase by 1
4. The "Total" count should increase by 1
5. Check browser console for update logs

## 📸 Expected Screenshots

### Initial Load
```
┌─────────────────────────────────────────────────┐
│          Zaad Dashboard                         │
│    Maamulka Sarrifka Automatic-ga ah            │
├─────────────────────────────────────────────────┤
│  [25]         [~5]        [~17]        [~2]     │
│  Total      Pending    Completed    Failed      │
├─────────────────────────────────────────────────┤
│  Recent Transactions                            │
│  [All] [Pending] [Completed] [Failed]           │
│                                                  │
│  +252 61 XXX XXXX    $123.45    [✓ completed]   │
│  +252 77 XXX XXXX    $67.89     [⏱ pending]     │
│  +252 63 XXX XXXX    $234.56    [✓ completed]   │
│  ...                                            │
└─────────────────────────────────────────────────┘
```

## 🐛 Troubleshooting

### Issue: No mock data showing
**Solution**: Check browser console. You should see `🧪 Mock Electron API installed for testing`. If not:
```bash
# Clear cache and restart
rm -rf node_modules .vite
pnpm install
pnpm dev
```

### Issue: "window.electron is not defined"
**Solution**: The mock API should install automatically. Check that `src/main.tsx` includes:
```typescript
import { installMockAPI } from "./lib/mockData";
installMockAPI();
```

### Issue: Transactions not updating
**Solution**: Real-time updates happen every 10 seconds. Wait a bit longer or check console for errors.

### Issue: Build errors
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🎭 Mock Data vs Real Data

### Current (Mock Data)
- ✅ Data generated locally
- ✅ No Firebase connection needed
- ✅ Perfect for UI testing
- ✅ Realistic Somali phone numbers
- ✅ Simulated real-time updates

### Future (Real Data)
- 🔄 Flutter mobile app will send SMS data
- 🔄 Firebase Realtime Database will sync
- 🔄 Desktop dashboard will receive real transactions
- 🔄 Actual USSD automation responses

## 📝 Test Checklist

Before moving to production:

- [ ] All UI components render correctly
- [ ] Stats calculations are accurate
- [ ] Filtering works (All, Pending, Completed, Failed)
- [ ] Scrolling is smooth
- [ ] Real-time updates work
- [ ] No console errors
- [ ] Responsive on different screen sizes
- [ ] Colors match design (green/yellow/red badges)
- [ ] Phone numbers formatted correctly
- [ ] Timestamps display relative times
- [ ] Electron desktop app works

## 🚦 Next Steps

Once you've verified the dashboard works with mock data:

1. ✅ **Desktop Dashboard** - COMPLETE (this repo)
2. 🔄 **Create Flutter Mobile App** - for SMS interception
3. 🔄 **Set up Firebase** - for data synchronization
4. 🔄 **Connect both apps** - through Firebase Realtime Database
5. 🔄 **Test end-to-end** - with real Zaad SMS messages

## 💡 Tips

- The mock data is regenerated each time you refresh the page
- Status distribution is realistic (70% completed, 20% pending, 10% failed)
- New transactions appear every 10 seconds when you keep the page open
- You can modify `src/lib/mockData.ts` to adjust:
  - Number of transactions
  - Amount ranges
  - Status distribution
  - Update frequency

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Make sure you're using Node.js 18+
4. Try clearing cache: `rm -rf node_modules .vite && pnpm install`

---

**Happy Testing! 🎉**

The dashboard is now ready to demonstrate the full Zaad automation system workflow!
