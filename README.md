
# Deeper Life Church Management System

A robust, unified digital platform for the Deeper Life Bible Church that serves as a secure, versatile, and future-proof ecosystem for communication, administration, worship, and fellowship, integrated with cutting-edge AI and blockchain concepts.

![Deeper Life CMS Mockup](https://storage.googleapis.com/web-dev-assets/dclm-sermons/dlcms-mockup.png)

---

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
  - [Frontend Architecture](#frontend-architecture)
  - [Backend Architecture](#backend-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## About The Project

The Deeper Life Church Management System is an ambitious project designed to create a comprehensive digital ecosystem for a global ministry. The goal is to unify worship, administration, fellowship, and spiritual growth onto a single, intuitive platform.

This application leverages modern technologies to provide a rich user experience:
- **Google Gemini API:** Powers a suite of AI tools, from sermon summarization and worship planning to a conversational AI chatbot for scriptural guidance.
- **Blockchain Concepts:** Introduces a transparent and immutable ledger for financial transactions, fostering trust and accountability within the organization.
- **Role-Based Access Control:** Tailors the user experience and feature set to different levels of ministry leadership, from local members to the General Superintendent.

The system is designed to be a central hub for members and leaders, fostering a connected and spiritually nourished global community.

---

## Key Features

The platform is divided into several core modules, each packed with features:

### Spiritual Resources
- **Pastor's Messages:** A media library for Pastor W.F. Kumuyi's video and audio messages, complete with AI-powered tools to generate summaries, key takeaways, and discussion points.
- **GHS Hymns:** A complete digital version of the Gospel Hymns & Songs book with search, categorization, audio playback, sheet music, and an **AI Hymn Recommender** to help plan worship services.
- **Holy Bible:** A powerful, multi-version Bible reader with parallel mode, comprehensive search, and personal study tools (bookmarks, notes, highlights). Features AI-generated insights and reading plans.
- **Search The Scriptures (STS):** An interactive daily Bible study guide with progress tracking and AI assistance to deepen understanding.
- **Daily Manna:** The daily devotional with audio playback and AI tools to generate personal prayers and small group discussion questions.

### Live & Community Engagement
- **Live Streaming:** A dedicated module for broadcasting live services with real-time chat. Includes a "Go Live" studio mode for administrators.
- **Connect Hub:** A comprehensive social and messaging center.
  - **Community Feed:** A social timeline for church members to share testimonies, prayer requests, and announcements.
  - **Secure Messenger:** A WhatsApp-style interface for end-to-end encrypted one-on-one and group chats.
  - **Ask Kumuyi (AI):** A sophisticated AI chatbot, trained in the persona of Pastor Kumuyi, providing wise, scripturally-sound counsel.

### Church Administration (For Leadership Roles)
- **User Management:** A secure panel for administrators to manage user accounts, roles, and permissions.
- **Attendance Tracking:** Tools to record, view, and analyze service attendance records over time.
- **Financial Management:** A multi-tab system featuring:
  - **Payments:** Record offerings, tithes, and other payments.
  - **Projects:** Track the progress of church-wide projects and funding.
  - **Accounts:** Manage church account details.
  - **Immutable Ledger:** A blockchain-based view of all financial transactions for complete transparency.
- **Analytics Dashboard:** A high-level dashboard providing visual data on membership growth, global engagement, and other key metrics.

### General Tools
- **Church Directory:** A global locator for finding churches and a directory for connecting with members.
- **Events Calendar:** A schedule of all upcoming global, national, and local church events.
- **Online Meetings:** An in-app video conferencing solution for leadership meetings and small groups.
- **Personalized Settings:** A user profile management page, featuring an **AI Profile Picture Generator**.

---

## Technology Stack

This project is built on a modern frontend stack. For a production-ready, scalable, and maintainable application of this magnitude, the following frontend and backend technologies are recommended.

### Frontend Architecture (Recommended)

The current stack of React, TypeScript, and Tailwind CSS is an excellent foundation. To elevate it to a world-class standard, the following architecture is proposed:

- **Framework: [Next.js](https://nextjs.org/)**
  - **Why:** Next.js provides a robust structure for production React applications. Server-Side Rendering (SSR) and Static Site Generation (SSG) offer significant performance and SEO benefits, crucial for public-facing content like sermons and events. Its file-based routing, API routes, and built-in optimizations (images, code-splitting) streamline development.

- **State Management: [Zustand](https://github.com/pmndrs/zustand)**
  - **Why:** While React Context is suitable for some state (like auth), a global state manager is needed for cross-component state like the audio player or notifications. Zustand offers a simple, unopinionated, and boilerplate-free API that is highly performant and easy to integrate.

- **Data Fetching & Caching: [TanStack Query (React Query)](https://tanstack.com/query/latest)**
  - **Why:** Essential for managing server state. It simplifies fetching, caching, and updating data from the backend, handling complexities like loading states, error handling, retries, and refetching, leading to a more responsive UI.

- **UI Components: [Shadcn/UI](https://ui.shadcn.com/)**
  - **Why:** An accessible, unopinionated, and beautifully designed component library built on Tailwind CSS and Radix UI. It provides the building blocks for creating a consistent and high-quality user interface, allowing for full customization to match the church's branding.

- **Testing:**
  - **Unit/Integration:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
  - **End-to-End:** [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/).

### Backend Architecture (Recommended)

A robust backend is critical for security, data integrity, and real-time features.

- **Framework: [NestJS](https://nestjs.com/) (Node.js & TypeScript)**
  - **Why:** NestJS provides a highly scalable, modular, and organized architecture. Its use of TypeScript and concepts from Object-Oriented and Functional Programming make it perfect for building a large, maintainable enterprise-level application.

- **Database: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)**
  - **Why:** PostgreSQL is a powerful and reliable open-source relational database that can handle the complex data relationships of a church management system. Prisma provides a type-safe database client that dramatically improves developer experience and reduces runtime errors.

- **Authentication: [Passport.js](https://www.passportjs.org/) with JWT**
  - **Why:** A standard, secure, and flexible solution for handling user authentication and role-based access control using JSON Web Tokens.

- **Real-time Features (Chat, Live Stream): [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) (via Socket.IO)**
  - **Why:** For bidirectional, low-latency communication needed for live chat, notifications, and real-time viewer counts.

- **Blockchain Integration: [Ethers.js](https://ethers.io/) / [Web3.js](https://web3js.org/)**
  - **Why:** To interact with an Ethereum-compatible blockchain (the hypothetical "Deeper Life Chain"). For a production environment, this would likely be a private, permissioned chain (e.g., Hyperledger Fabric) to ensure data privacy and control.

- **Deployment & Infrastructure:**
  - **Cloud Provider:** Google Cloud Platform (GCP) is a natural choice to co-locate with the Gemini API for low latency.
  - **Services:**
    - **Compute:** Google Kubernetes Engine (GKE) or Cloud Run for containerized application deployment.
    - **Database:** Cloud SQL for PostgreSQL.
    - **Storage:** Cloud Storage for media assets (sermons, images).
  - **CI/CD:** GitHub Actions for automated testing and deployment pipelines.

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/deeper-life-cms.git
    cd deeper-life-cms
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

---

## Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file in the root of your project.

Create a file named `.env` and add your Google Gemini API key:

```
API_KEY="YOUR_GEMINI_API_KEY"
```

**Note:** The application is designed to source this key directly from the `process.env` object. Ensure your build environment correctly handles and injects this variable.

---

## Usage

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port specified in your console) to view it in the browser.

You can log in with one of the mock user accounts from `src/data/mockData.ts` to test different role-based views. For example:
- **Username:** `reg_admin`
- **Password:** `password123`

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
