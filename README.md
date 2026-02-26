# Crypto Dashboard

A **real-time cryptocurrency dashboard** built with **React**, **Vite**, and **TanStack Query**, demonstrating senior-level front-end skills including live data fetching, charting, state management, and persistent favorites.

---

## 🚀 Features

- **Live Crypto Prices**: Fetches top 10 cryptocurrencies using the CoinGecko API, refreshing automatically every 15 seconds.
- **Price Change Tracking**: catch the changes in the data in display it
- **Interactive Charts**: View 7-day sparkline charts for individual coins.
- **Favorites System**: Add coins to favorites using a heart button; favorites are persisted in `Fast API backend`. (--- Not yet done because I can't deploy backend--)
- **Routing**: Navigate between the main dashboard, coin detail pages, and favorites page using React Router.
- **Responsive UI**: Mobile-friendly design using Tailwind CSS.
- **Clean State Management**: Server state handled with **TanStack Query**, client state managed via React hooks.
- **Professional UX Enhancements**:
  - Loading spinners during API requests
  - Last updated timestamps
  - Subtle card highlights for changes
  - Smooth hover effects

---

## 📂 Project Structure
- `services/coinservice.ts`: All API requests to CoinGecko centralized here.
- `components/charts/PriceChart.tsx`: Displays sparkline charts for coins.
- `components/layout/Loading.tsx`: Display message when querying data from backend
- `components/layout/Navbar.tsx`: Display the menu
- `pages/`: Main app pages (Dashboard, Coin Detail, Favorites).

---

## ⚙️ Technologies Used

- **React** (Functional Components + Hooks)
- **Vite** (Fast development build tool)
- **TanStack Query** (Server state management, caching, background refetch)
- **React Router v6** (Routing)
- **Recharts** (Charts)
- **Tailwind CSS** (Responsive styling)
- **CoinGecko API** (Real-time cryptocurrency data)

---

## 📌 Installation

```bash
# Clone the repository
git clone https://github.com/djamara/live-crypto-dashboard.git
cd live-crypto-dashboard

# Install dependencies
npm install

# Run development server
npm run dev