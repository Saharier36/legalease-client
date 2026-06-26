<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/LegalEase-%23FFFFFF?style=flat-square&label=%20&labelColor=%23111111">
    <img src="https://img.shields.io/badge/LegalEase-%231a1a2e?style=flat-square&label=%20&labelColor=%231a1a2e" height="1">
  </picture>
</p>

<h1 align="center">⚖️ LegalEase</h1>
<h3 align="center">Online Lawyer Hiring & Legal Service Marketplace</h3>

<p align="center">
  <em>A full-stack MERN platform connecting clients, businesses, and legal seekers with verified lawyers — streamlining discovery, hiring, payments, and case management.</em>
</p>

<p align="center">
  <a href="https://legalease-lovat.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Client-vercel.app-181717?style=flat-square&logo=vercel&logoColor=white" alt="Live Client">
  </a>
  <a href="https://legalease-server-zeta.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Server-vercel.app-181717?style=flat-square&logo=vercel&logoColor=white" alt="Live Server">
  </a>
  <a href="https://github.com/Saharier36/legalease-client" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Client-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub Client">
  </a>
  <a href="https://github.com/Saharier36/legalease-server" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Server-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub Server">
  </a>
</p>

<br/>

---

## 📋 Table of Contents

- [Purpose & Vision](#purpose--vision)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Directory Structure](#-architecture--directory-structure)
- [System Analytics & Metrics Dashboard](#-system-analytics--metrics-dashboard)
- [Website Mockup Showcase](#-website-mockup-showcase)
- [Environment Variables](#-environment-variables)
- [Local Installation Guide](#-local-installation-guide)
- [Future Roadmap](#-future-roadmap)
- [License & Contributing](#-license--contributing)

---

## 🎯 Purpose & Vision

Traditional legal hiring is constrained by geography, opaque referral networks, and high barriers to entry for emerging legal professionals. **LegalEase democratises access to legal expertise** by building a transparent, digital marketplace where:

- **Clients & Businesses** can discover, compare, and hire verified lawyers with confidence — backed by real reviews, transparent pricing, and secure Stripe-powered payments.
- **Lawyers** gain a global digital storefront, eliminate dependency on physical firm affiliations, and access rich analytics on their caseload and earnings.
- **Platform Administrators** maintain trust and compliance through role-based governance, transaction auditing, and content moderation tools.

LegalEase demonstrates advanced full-stack (MERN) capabilities including multi-role dashboards, JWT-authenticated sessions, Google OAuth integration, real-time payment parsing, and a complete review ecosystem.

---

## 🚀 Key Features

### 👤 Client (Service Seeker)

| Feature                  | Description                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| 🔍 **Browse & Filter**   | Explore verified lawyers by specialization, rating, location, and hourly rate. |
| 👁️ **Detailed Profiles** | View credentials, experience, service listings, and client reviews.            |
| 💳 **Instant Hire**      | Secure one-click hiring via Stripe payment integration.                        |
| ⭐ **Review Ecosystem**  | Drop ratings and written reviews on hired professionals.                       |
| 📜 **Hiring History**    | Full timeline of past and active engagements with status tracking.             |

### 👨‍⚖️ Lawyer (Service Provider)

| Feature                     | Description                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| ✅ **Verification Gateway** | One-time payment verification to unlock listing capabilities.                                     |
| 📊 **Lawyer Dashboard**     | Dedicated admin panel for service CRUD, availability toggling (publish/unpublish), and analytics. |
| 💼 **Case Management**      | Track active clients, pending hires, and case statuses.                                           |
| 💰 **Financial Analytics**  | Earnings breakdown, transaction history, and platform metrics.                                    |

### 🛡️ Admin (Platform Governance)

| Feature                      | Description                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| 👥 **User Management**       | Role escalations (client → lawyer → admin), account suspension, and auditing.   |
| 📋 **Listing Moderation**    | Review, approve, or unpublish lawyer service listings.                          |
| 💳 **Transaction Oversight** | Full visibility into platform revenue, payment disputes, and Stripe payouts.    |
| 📈 **Platform Analytics**    | Aggregate KPIs — active users, total hires, conversion funnels, revenue trends. |

### 🔐 Authentication & Security

| Feature                    | Description                                                              |
| -------------------------- | ------------------------------------------------------------------------ |
| 🔑 **Email/Password Auth** | Standard secure registration & login with hashed credentials.            |
| 🌐 **Google OAuth**        | One-click sign-in via Firebase-powered Google authentication.            |
| 🪙 **JWT Sessions**        | JSON Web Token based authorization with cookie caching for seamless UX.  |
| 🚪 **Role-Based Access**   | Middleware-enforced route protection per role (client / lawyer / admin). |

---

## 🧰 Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4"/>
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=flat-square&logo=stripe&logoColor=white" alt="Stripe"/>
  <img src="https://img.shields.io/badge/Better_Auth-6366F1?style=flat-square&logo=auth0&logoColor=white" alt="Better Auth"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=chartdotjs&logoColor=white" alt="Recharts"/>
  <img src="https://img.shields.io/badge/Sonner-FF4D4D?style=flat-square&logo=react&logoColor=white" alt="Sonner"/>
  <img src="https://img.shields.io/badge/Next_Themes-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="next-themes"/>
  <img src="https://img.shields.io/badge/MongoDB_Adapter-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB Adapter"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

### Core Dependencies

| Layer             | Technology                                                  |
| ----------------- | ----------------------------------------------------------- |
| **Frontend**      | Next.js 16, React 19, Tailwind CSS 4, Framer Motion, HeroUI |
| **Backend**       | Node.js, Express.js, RESTful API                            |
| **Database**      | MongoDB (with Better Auth MongoDB adapter)                  |
| **Auth**          | Better Auth (JWT plugin, Google OAuth, Email/Password)      |
| **Payments**      | Stripe SDK (`stripe` v22)                                   |
| **Charts**        | Recharts, React Icons                                       |
| **Notifications** | Sonner (toast system)                                       |
| **Deployment**    | Vercel (client + server)                                    |

---

## 🏗 Architecture & Directory Structure

```
legalease-client/
├── public/                        # Static assets
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Auth routes (login, register)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/           # Protected dashboard routes
│   │   │   ├── dashboard/
│   │   │   │   ├── admin/         # Admin panel
│   │   │   │   │   ├── all-transactions/
│   │   │   │   │   ├── analytics/
│   │   │   │   │   └── manage-users/
│   │   │   │   ├── lawyer/        # Lawyer panel
│   │   │   │   │   ├── hiring-history/
│   │   │   │   │   └── manage-legal-profile/
│   │   │   │   └── user/          # User panel
│   │   │   │       ├── comments/
│   │   │   │       ├── hiring-history/
│   │   │   │       └── update-profile/
│   │   ├── (main)/                # Public/main routes
│   │   │   ├── browse-lawyers/    # Lawyer discovery
│   │   │   │   └── [id]/          # Lawyer detail page
│   │   │   └── page.js            # Landing page
│   │   ├── payment/               # Stripe payment pages
│   │   ├── unauthorized/          # 403 fallback
│   │   ├── api/                   # API route handlers
│   │   ├── layout.js
│   │   └── globals.css
│   ├── components/
│   │   ├── dashboard/             # Dashboard-specific components
│   │   │   ├── AdminDashboard/
│   │   │   ├── LawyerDashboard/
│   │   │   └── UserDashboard/
│   │   ├── home/                  # Landing page sections
│   │   ├── layout/                # Navbar, Footer, Sidebar
│   │   └── ui/                    # Reusable UI components
│   ├── core/                      # API client & session utilities
│   │   ├── apiClient.js           # Fetch wrappers (CRUD)
│   │   ├── session-client.js      # Client-side session hook
│   │   └── session.js             # Server-side session helpers
│   ├── lib/                       # Library integrations
│   │   ├── auth-client.js         # Better Auth client config
│   │   ├── auth.js                # Better Auth server config
│   │   └── stripe.js              # Stripe server init
│   ├── services/                  # Server actions & API calls
│   │   ├── actions.js             # Server mutations (create, update, delete)
│   │   └── api.js                 # Server data fetchers
│   └── utils/                     # Utility functions
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tailwind.config.js
```

---

## 📊 System Analytics & Metrics Dashboard

> _Mock data visualisation for the admin analytics panel._

```
┌────────────────────────────────────────────────────────────┐
│                    PLATFORM OVERVIEW                       │
├─────────────┬──────────────┬──────────────┬────────────────┤
│  Total Hires│ Active Lawyers│  Total Users │  Conversion    │
│    1,847     │      142      │    4,231     │    12.4%       │
├─────────────┴──────────────┴──────────────┴────────────────┤
│                                                           │
│  Monthly Transaction Volume (Last 6 Months)                │
│                                                           │
│  $50K ┤    ██                                              │
│  $40K ┤ ██ ██    ██                                       │
│  $30K ┤ ██ ██ ██ ██ ██                                    │
│  $20K ┤ ██ ██ ██ ██ ██ ██                                 │
│  $10K ┤ ██ ██ ██ ██ ██ ██ ██                              │
│       └───┬──┬──┬──┬──┬──┬──┬──                           │
│           Jan Feb Mar Apr May Jun                          │
│                                                           │
│  Total Revenue: $247,890  │  Avg. Transaction: $134.20     │
│  ─────────────────────────┴────────────────────────────   │
│                                                           │
│  User vs Lawyer Growth                                     │
│  ┌─────────────────────────────────────────────────┐      │
│  │   📈 Users    ████████████████████  4,231       │      │
│  │   👨‍⚖️ Lawyers  ██████░░░░░░░░░░░░░░  142        │      │
│  │   🔄 Hires    ████████████░░░░░░░░░░  1,847     │      │
│  └─────────────────────────────────────────────────┘      │
│                                                           │
└────────────────────────────────────────────────────────────┘
```

_Note: Actual analytics charts are rendered dynamically using **Recharts** in the admin dashboard._

---

## 🎨 Website Mockup Showcase

> _Replace the placeholder below with your Figma design exports, screenshots, or product mockups._

<p align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <strong>🏠 Landing Page</strong><br/><br/>
        <img src="https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Landing+Page+Mockup" alt="Landing Page" width="100%" style="border-radius: 8px; border: 2px solid #333;" />
        <br/><em>Hero banner, featured lawyers, categories, CTA</em>
      </td>
      <td align="center" width="50%">
        <strong>🔍 Browse Lawyers</strong><br/><br/>
        <img src="https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Browse+Lawyers+Mockup" alt="Browse Lawyers" width="100%" style="border-radius: 8px; border: 2px solid #333;" />
        <br/><em>Filterable grid with lawyer cards & ratings</em>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <strong>📋 Lawyer Dashboard</strong><br/><br/>
        <img src="https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Lawyer+Dashboard+Mockup" alt="Lawyer Dashboard" width="100%" style="border-radius: 8px; border: 2px solid #333;" />
        <br/><em>Service management, analytics, case tracking</em>
      </td>
      <td align="center" width="50%">
        <strong>🛡️ Admin Panel</strong><br/><br/>
        <img src="https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Admin+Panel+Mockup" alt="Admin Panel" width="100%" style="border-radius: 8px; border: 2px solid #333;" />
        <br/><em>User management, transactions, platform KPIs</em>
      </td>
    </tr>
  </table>
</p>

---

## 🔐 Environment Variables

### Client (`legalease-client/.env.local`)

```env
# Application
NEXT_PUBLIC_BASE_URL=https://legalease-server-zeta.vercel.app

# Better Auth
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
AUTH_DB_NAME=legalease_auth

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Server (`legalease-server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=<your-jwt-secret>
STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<your-google-client-id>
```

---

## 💻 Local Installation Guide

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x or **pnpm** ≥ 8.x
- **MongoDB** Atlas account (or local instance)
- **Stripe** account (test mode)
- **Google Cloud Console** project (OAuth credentials)

### Step 1 — Clone Repositories

```bash
# Client
git clone https://github.com/Saharier36/legalease-client.git
cd legalease-client

# Server (separate terminal)
git clone https://github.com/Saharier36/legalease-server.git
cd legalease-server
```

### Step 2 — Install Dependencies

```bash
# Client
cd legalease-client
npm install

# Server
cd legalease-server
npm install
```

### Step 3 — Configure Environment

Copy the respective `.env` files:

```bash
# Client
cp .env.example .env.local    # or create from template above

# Server
cp .env.example .env          # or create from template above
```

Populate all fields with your credentials (see [Environment Variables](#-environment-variables) section).

### Step 4 — Start Development Servers

```bash
# Server (starts on http://localhost:5000)
npm run dev

# Client (separate terminal, starts on http://localhost:3000)
npm run dev
```

### Step 5 — Verify

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the LegalEase landing page. Register a new account, assign a role, and explore the dashboards.

> **Note:** The server must be running before the client can fetch lawyer listings, process payments, or authenticate users.

---

## 🛣 Future Roadmap

| Feature                             | Status         | Description                                                                      |
| ----------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| 🎥 **Video Consultation Spaces**    | 🔮 Planned     | Real-time video calls via WebRTC for virtual client-lawyer meetings.             |
| 🤖 **AI-Powered Contract Analysis** | 🔮 Planned     | Automated document review and risk scoring using LLM APIs.                       |
| 💬 **Real-Time Chat**               | 🔮 Planned     | In-app messaging with typing indicators, file sharing, and read receipts.        |
| 🌍 **Multi-Language Support**       | 🔮 Planned     | i18n for global accessibility (English, Spanish, French, Arabic).                |
| ⭐ **Lawyer Rating Algorithm**      | 🔮 Planned     | Weighted scoring system combining review volume, recency, and case success rate. |
| 📄 **E-Signature Integration**      | 🔰 Researching | Embed HelloSign or DocuSign for legally binding digital contracts.               |
| 📱 **Mobile App (React Native)**    | 🔰 Researching | Cross-platform native apps mirroring the web experience.                         |
| 🧪 **Automated Test Suite**         | 🔰 Researching | End-to-end tests with Playwright + API integration tests.                        |

---

## 📄 License & Contributing

### License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

### Contributing

Contributions are welcome! Please adhere to the following guidelines:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code of Conduct

By participating, you agree to maintain a respectful, inclusive, and harassment-free environment for everyone.

### Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/Saharier36/legalease-client/issues) with a clear description and reproduction steps.

---

<p align="center">
  <strong>Built with ❤️ by the LegalEase Team</strong><br/>
  <sub>© 2026 LegalEase. All rights reserved.</sub>
</p>
