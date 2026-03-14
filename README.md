
# 🏨 LuxeStay - Premium Hotel & Experience Booking Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Site-blue?style=for-the-badge&logo=github)](https://koustav2303.github.io/LuxeStay-hotel-booking-webpage/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](#)

LuxeStay is a modern, high-end web application for booking luxury hotel rooms and curated travel experiences. Designed with a mobile-first, luxury-brand approach, it features smooth animations, continuous-scroll layouts, and a fully functional frontend dashboard.

---

## 🚀 Live Preview
**Check out the live application here:** [LuxeStay Live Site](https://koustav2303.github.io/LuxeStay-hotel-booking-webpage/)

*(Note: Best viewed on both Desktop and Mobile devices to experience the responsive layout!)*

---

## ✨ Key Features

- **Modern Authentication Flow:** Interactive Login/Signup screens with simulated authentication. User sessions are persisted using browser `localStorage`.
- **Dynamic User Dashboard:** A continuous-scroll profile page featuring:
  - An **Apple Wallet-style** auto-sliding credit card carousel.
  - Interactive "Add Card" and "Delete Card" modals.
  - A dynamic "My Trips" section that tracks confirmed and completed bookings.
- **Global State Management:** Powered by React Context API. Bookings and cart data persist across page refreshes so users never lose their itinerary.
- **Dynamic Routing:** Unique, dynamically generated itinerary pages for every single booking (e.g., `/booking/101`).
- **Invoice Generation:** Users can download fully formatted `.txt` receipt invoices directly to their local device.
- **Luxury UI/UX:** Built with Tailwind CSS and Framer Motion for buttery-smooth page transitions, glassmorphism effects, and highly polished micro-interactions.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM (v6)
* **Animations:** Framer Motion
* **Icons:** Lucide-React
* **State Management:** React Context API + LocalStorage 

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI elements (Navbar, Footer, Hero, Featured)
├── context/          # Global state management (AuthContext.js)
├── data/             # Mock databases for Hotels, Experiences, and Rooms
├── pages/            # Main application routes
│   ├── Auth.jsx              # Login & Registration
│   ├── Profile.jsx           # User Dashboard & Saved Cards
│   ├── BookingDetails.jsx    # Dynamic Itinerary & Invoice generation
│   ├── Checkout.jsx          # Payment flow
│   ├── ExperienceCheckout.jsx# Dedicated checkout for experiences
│   └── ...
├── App.jsx           # Main router & layout configuration
└── main.jsx          # React DOM entry point
💻 Running the Project Locally
To get a local copy up and running, follow these simple steps:

Prerequisites
Make sure you have Node.js installed on your machine.

npm

Bash
npm install npm@latest -g
Installation
Clone the repo

Bash
git clone [https://github.com/koustav2303/LuxeStay-hotel-booking-webpage.git](https://github.com/koustav2303/LuxeStay-hotel-booking-webpage.git)
Navigate to the project directory

Bash
cd LuxeStay-hotel-booking-webpage
Install NPM packages

Bash
npm install
Start the Vite development server

Bash
npm run dev
Open http://localhost:5173 in your browser.

🎯 Future Enhancements
While LuxeStay is currently a frontend-focused application demonstrating UI/UX and state management, future updates may include:

Integration with a real backend (Node.js/Express or Firebase).

Live payment gateway processing (Stripe API).

Real-time availability calendars.

User reviews and rating system.

👨‍💻 Author
Koustav Pan Frontend Developer passionate about building beautiful, interactive, and user-centric web applications.

GitHub: @koustav2303

LinkedIn: Koustav Pan (Add your link here)

Portfolio: koustav.dev (Add your link here if you have one)

If you like this project, please consider giving it a ⭐ on GitHub!