# KrishiSarthi Admin Console

Welcome to the administrative heart of the KrishiSarthi platform. This portal allows you to manage users, verify equipment listings, and monitor platform statistics.

## 🔐 Access Credentials

Use the following default credentials to access the console if environment variables are not set:

- **Default Username**: `admin`
- **Default Password**: `admin123`

> [!IMPORTANT]
> To change these in production, update the `ADMIN_USERNAME` and `ADMIN_PASSWORD` keys in your `Backend/.env` file.

## 🚀 Getting Started

1. **Start the Backend**: Ensure the Node.js server is running (usually on port 5000).
2. **Launch Admin Web**:
   ```bash
   cd admin
   npm run dev
   ```
3. **Login**: Navigate to `http://localhost:5174/login` (or the port Vite provides) and enter your credentials.

## 🛠️ Administrative Features

- **Dashboard**: Real-time overview of total users, equipment, and platform revenue.
- **Equipment Management**: Review pending equipment listings. You can **Approve** them to make them visible in the Marketplace or **Reject** them if they don't meet standards.
- **User Insights**: View the list of registered farmers and equipment owners.
- **Booking Overview**: Monitor recent rental transactions and their statuses.

## 🎨 Design System

The Admin portal uses a **Dark Mode First** design philosophy to distinguish it from the main user portal while maintaining the core KrishiSarthi color palette:
- **Emerald (#10B981)**: Primary actions and success states.
- **Amber (#F59E0B)**: Warnings and secondary highlights.
- **Slate/Gray**: Deep background for high-contrast data visualization.

---
*Built with React, Tailwind CSS, and Framer Motion.*
