```md
# 🏨 LuxeStay – Premium Hotel Booking Platform

[![Deploy Status](https://img.shields.io/badge/Deploy-GitHub_Pages-success?style=for-the-badge&logo=github)](https://Koustav2303.github.io/LuxeStay-hotel-booking-webpage/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

LuxeStay is a high-performance, production-grade Single Page Application (SPA) designed to provide a seamless and visually stunning hotel booking experience. Built with a modern React stack, it features dynamic routing, global state management, complex live filtering, and cinematic UI animations.

**Live Demo:** [View LuxeStay Live](https://koustav2303.github.io/LuxeStay-hotel-booking-webpage/)

---

## ✨ Key Features

### 1. Advanced UI/UX & Animations
* **Framer Motion Integration:** Smooth page transitions, layout animations during filtering, and expanding modals.
* **Glassmorphism Design:** Scroll-aware navigation bars that transition from transparent to frosted glass.
* **Fully Responsive:** A mobile-first approach featuring a custom slide-down animated hamburger menu and touch-friendly sliders.
* **Parallax Hero:** Cinematic home page hero section with depth-of-field scrolling effects.

### 2. Intelligent Data & Routing
* **Dynamic Routing:** Utilizes `react-router-dom` (configured with `HashRouter` for GitHub Pages compatibility) to generate unique pages for individual hotel rooms (e.g., `/#/hotels/1`).
* **Live Filtering Engine:** Multi-parameter filtering on the Rooms page allowing users to sort by Max Price, Room Type (Villa, Suite, etc.), and specific Amenities instantly without page reloads.
* **Centralized Data:** A modular architecture where mock data (`roomsData.js`) acts as a central database, ensuring consistency across listing cards and detail pages.

### 3. Global Authentication State
* **Context API (`AuthContext`):** Manages user sessions globally. The app "remembers" the user even after a browser refresh using `localStorage`.
* **Dual-Mode Auth Page:** A unified authentication screen that smoothly toggles between "Sign In" and "Sign Up" states.
* **Smart Name Handling:** Supports manual name entry during Sign Up, and intelligently generates a display name from the email prefix during Login.
* **Protected Routes:** A personalized User Profile Dashboard that is only accessible to authenticated users, displaying member tiers and booking history.

---

## 🛠️ Tech Stack

* **Framework:** React 19
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **Routing:** React Router v7
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Deployment:** GitHub Pages (`gh-pages`)

---

## 📂 Project Structure

```text
hotel-luxe/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI parts
│   │   ├── Navbar.jsx     # Smart, scroll-aware navigation
│   │   ├── Hero.jsx       # Parallax home header
│   │   ├── Featured.jsx   # Trending carousels
│   │   └── Footer.jsx     # Global footer
│   ├── context/           # Global State
│   │   └── AuthContext.jsx # Manages user login state
│   ├── data/              # Centralized mock databases
│   │   └── roomsData.js   # Room catalog and details
│   ├── pages/             # Route-level components
│   │   ├── Auth.jsx       # Login & Signup system
│   │   ├── Experiences.jsx# Filterable activities grid
│   │   ├── HotelDetails.jsx # Dynamic single room view
│   │   ├── Profile.jsx    # Protected user dashboard
│   │   ├── Rooms.jsx      # Main catalog with live filters
│   │   └── SearchResults.jsx 
│   ├── App.jsx            # Main router and layout wrapper
│   └── main.jsx           # App entry point & Context Provider
├── vite.config.js         # Vite configuration (base path set)
├── tailwind.config.js     # Tailwind theme and custom styling
└── package.json           # Dependencies and deployment scripts

```

---

## 🚀 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository

```bash
git clone [https://github.com/Koustav2303/LuxeStay-hotel-booking-webpage.git](https://github.com/Koustav2303/LuxeStay-hotel-booking-webpage.git)
cd LuxeStay-hotel-booking-webpage

```

### 2. Install dependencies

```bash
npm install

```

### 3. Start the development server

```bash
npm run dev

```

Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser to view the application.

---

## 🌐 Deployment (GitHub Pages)

This project is configured for seamless deployment to GitHub pages using the `gh-pages` package.

### Deployment Configurations Applied:

1. **Vite Config:** `base` path is set to `/LuxeStay-hotel-booking-webpage/`.
2. **Router:** Upgraded from `BrowserRouter` to `HashRouter` to prevent 404 errors on page reloads.
3. **Scripts:** `predeploy` and `deploy` scripts added to `package.json`.

### How to push an update:

Whenever you make changes to the code, run these commands to update the live site:

```bash
# 1. Commit your changes to the repository
git add .
git commit -m "Describe your update here"
git push origin main

# 2. Build and deploy to GitHub Pages
npm run deploy

```

---

## 🔮 Future Enhancements (Roadmap)

* [ ] **Backend Integration:** Replace the mock `roomsData.js` with a Node.js/Express REST API and a MongoDB database.
* [ ] **Real Authentication:** Integrate Firebase Auth or JWT tokens for secure user sign-ups.
* [ ] **Payment Gateway:** Add a Stripe checkout flow to the "Reserve Now" buttons.
* [ ] **Date Picker UI:** Implement `react-dates` or similar for the booking widget to check real-time room availability.

---

*Designed and developed by Koustav Pan.*

```

```