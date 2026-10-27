# 🚜 KrishiSarthi: Smart Agricultural Equipment Rental Platform

KrishiSarthi is a high-end, full-stack digital ecosystem designed to empower modern farmers. It provides a seamless, secure, and smart platform for renting specialized agricultural machinery, ensuring every farmer has access to the tools they need to thrive.

---

## 🌟 Key Features

### 🚜 Unified Farmer Experience
- **One Profile, All Access**: Farmers no longer need separate accounts to rent or list machinery. Every user has a unified **Farmer Profile** capable of both booking equipment and earning by listing their own.
- **Smart Booking Lifecycle**: Includes real-time availability tracking and multi-stage booking statuses (Pending -> Admin Approved -> Paid).

### 🛠️ Professional Admin Portal
- **Centralized Moderation**: A dedicated, secure dashboard for platform administrators to oversee every aspect of the ecosystem.
- **Global Approvals**: Admins review and verify both **Equipment Listings** and **Booking Requests** to ensure trust and high-quality standards across the platform.
- **Real-time Stats**: Track global revenue, user growth, and listings with a professional, mobile-responsive data console.

### 🤖 Inteligent Farming Assistants
- **AI Farming Expert**: A floating, persistent AI assistant powered by OpenAI, accessible from any page to answer complex agricultural queries (crop disease, soil health, etc.).
- **Smart Weather Hub**: Integrated directly into the Home Page, providing real-time localized weather data and actionable farming suggestions based on temperature, humidity, and rainfall.

### 💳 Secure Transactions
- **Stripe Integration**: Professional payment processing for rental bookings.
- **Admin Reconciliation**: Automated tracking of platform-wide revenue.


## 🚀 Quick Setup

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB** (Local or Atlas)
- **Stripe Account** (For payments)
- **OpenWeatherMap API Key** (For weather data)

### 2. Backend Initialization
```bash
cd Backend
npm install
# Create .env (see Environment Variables section below)
npm run dev # Starts on port 5000
```

### 3. Launch the unified frontend
```bash
# In one terminal
cd Frontend
npm install
npm run dev # Starts on port 5173

```

The farmer and administrator experiences run in the same `Frontend` app. Use `/login` for farmer accounts, `/admin` for the administrator console, `/admin/login` to sign in with the configured admin email/password, and `/admin/signup` to create the invited admin account.

### Vercel frontend settings
- Set the Vercel project's **Root Directory** to `Frontend`, with build command `npm run build` and output directory `dist`.
- Set `VITE_API_BASE_URL` in the Vercel project's environment variables to the deployed backend URL ending in `/api` (do not use localhost in production).
- Deploy the `Backend` separately. Configure its `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL` (the deployed frontend origin), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SIGNUP_CODE` environment variables there.
- The Vercel rewrite in `Frontend/vercel.json` routes deep links such as `/admin/login` back to the single-page app.

---

## ⚙️ Environment Variables (`Backend/.env`)

Ensure your `.env` contains the following critical keys:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/krishisarthi
JWT_SECRET=your_jwt_signing_key

# Payment Integration
STRIPE_SECRET_KEY=sk_test_...

# API Integrations
OPENWEATHER_API_KEY=your_key # Get from openweathermap.org
OPENAI_API_KEY=sk-... # Get from platform.openai.com

# Access Configuration
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5173
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
ADMIN_SIGNUP_CODE=choose-a-private-invite-code
```

---

## 📁 Directory Structure

```text
KrishiSarthi/
├── Backend/             # Express API Server
│   ├── controllers/     # Business Logic (Weather, Admin, Bookings)
│   ├── models/          # Mongoose Schemas (User, Equipment, Booking)
│   ├── routes/          # API Endpoints
│   └── uploads/         # Local Equipment Image Storage
├── Frontend/            # Unified farmer and admin app
│   ├── src/components/  # UI Components (Navbar, FloatingAI)
│   └── src/pages/       # App Views (Marketplace, Dashboard, AI)
└── admin/               # Legacy standalone app (not needed to run)
    ├── src/pages/       # Admin Views (Login, Signup, Dashboard)
    └── src/styles/      # Shared Design System
```

---

## 🛡️ Administrative Guidance

### Administrator access
- **Email**: `admin@gmail.com` (configurable with `ADMIN_EMAIL`)
- **Password**: Set `ADMIN_PASSWORD` in `Backend/.env` (defaults to `admin123` for local development)
- Admin account signup at `/admin/signup` requires `ADMIN_SIGNUP_CODE` in `Backend/.env`.

### Moderation Workflow
1. **Equipment Verification**: When a Farmer lists a tractor, it appears in the **Admin Dashboard > Manage Equipment**. It must be approved before appearing in the public marketplace.
2. **Booking Moderation**: Every rental request is reviewed by the Admin in **Manage Bookings**. Once approved, the Farmer is notified and can proceed to Stripe Payment.

---



## 🌍 Roadmap & Deployment
- [ ] Migrate local `uploads/` to **Cloudinary** or **AWS S3** for production-ready image hosting.
- [ ] Implement **Push Notifications** for booking approvals.
- [ ] Expand the **AI Assistant** with multi-language support (Hindi, Marathi, etc.).

---
**KrishiSarthi** — Modernizing Agriculture, One Rental at a Time. 🚜🌱.!



