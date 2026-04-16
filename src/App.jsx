import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- LAYOUT COMPONENTS (Eagerly Loaded for immediate paint) ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Footer from './components/Footer';

// --- CORE & UTILITY PAGES (Eagerly Loaded for fast access) ---
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import Offers from './pages/Offers'; 
import Policy from './pages/Policy'; // Renamed to bypass ad-blockers
import Terms from './pages/Terms';   // New Terms of Service page

// --- LAZY LOADED ECOSYSTEMS (Code Splitting for Performance) ---
// By lazy loading these heavy components, we ensure the initial JavaScript bundle is tiny.

// Core Stays & Experiences
const Rooms = lazy(() => import('./pages/Rooms'));
const Experiences = lazy(() => import('./pages/Experiences'));
const HotelDetails = lazy(() => import('./pages/HotelDetails'));

// Booking & Checkout Flows
const BookingDetails = lazy(() => import('./pages/BookingDetails')); 
const Checkout = lazy(() => import('./pages/Checkout')); 
const ExperienceCheckout = lazy(() => import('./pages/ExperienceCheckout'));

// Events Ecosystem
const Events = lazy(() => import('./pages/Events')); 
const EventFloorplan = lazy(() => import('./pages/EventFloorplan')); 
const CustomRendering = lazy(() => import('./pages/CustomRendering')); 

// Charters & Transfers Ecosystem
const Charters = lazy(() => import('./pages/Charters'));
const CharterInquiry = lazy(() => import('./pages/CharterInquiry')); 
const AirportTransfer = lazy(() => import('./pages/AirportTransfer'));

// Spa Ecosystem
const Spa = lazy(() => import('./pages/Spa'));
const SpaReservation = lazy(() => import('./pages/SpaReservation')); 

// Dining Ecosystem
const Dining = lazy(() => import('./pages/Dining')); 
const DiningMenu = lazy(() => import('./pages/DiningMenu')); 
const DiningReservation = lazy(() => import('./pages/DiningReservation')); 

// --- SCROLL TO TOP UTILITY ---
// Ensures that every time a user clicks a link, the new page starts at the very top.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- HOME PAGE COMPONENT ---
const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Featured />
    <Footer />
  </>
);

// --- GLOBAL LOADING SPINNER ---
// Shown briefly while lazy-loaded chunks are being fetched
const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-slate-800 border-t-yellow-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      
      {/* Suspense wraps our routes to handle the loading states of our lazy-loaded components. */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          
          {/* Main Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Authentication & Profile */}
          <Route path="/login" element={<Auth />} />
          <Route path="/profile" element={
            <> <Navbar /> <Profile /> <Footer /> </>
          } />

          {/* Utility Pages */}
          <Route path="/search" element={
            <> <Navbar /> <SearchResults /> <Footer /> </>
          } />
          <Route path="/offers" element={
            <> <Navbar /> <Offers /> <Footer /> </>
          } />
          
          {/* Legal Routes */}
          <Route path="/privacy" element={
            <> <Navbar /> <Policy /> <Footer /> </>
          } />
          <Route path="/terms" element={
            <> <Navbar /> <Terms /> <Footer /> </>
          } />

          {/* Core Navigation Pages */}
          <Route path="/rooms" element={
            <> <Navbar /> <Rooms /> <Footer /> </>
          } />
          <Route path="/experiences" element={
            <> <Navbar /> <Experiences /> <Footer /> </>
          } />

          {/* Events Ecosystem Routes */}
          <Route path="/events" element={
            <> <Navbar /> <Events /> <Footer /> </>
          } />
          <Route path="/events/floorplan" element={
            <> <Navbar /> <EventFloorplan /> <Footer /> </>
          } />
          <Route path="/events/custom-render" element={
            <> <Navbar /> <CustomRendering /> <Footer /> </>
          } />

          {/* Charters Ecosystem Routes */}
          <Route path="/charters" element={
            <> <Navbar /> <Charters /> <Footer /> </>
          } />
          <Route path="/charters/inquire" element={
            <> <Navbar /> <CharterInquiry /> <Footer /> </>
          } />
          
          {/* Airport Transfers */}
          <Route path="/transfer" element={
            <> <Navbar /> <AirportTransfer /> <Footer /> </>
          } />

          {/* Spa Ecosystem Routes */}
          <Route path="/spa" element={
            <> <Navbar /> <Spa /> <Footer /> </>
          } />
          <Route path="/spa/reserve" element={
            <> <Navbar /> <SpaReservation /> <Footer /> </>
          } />

          {/* Dining Ecosystem Routes */}
          <Route path="/dining" element={
            <> <Navbar /> <Dining /> <Footer /> </>
          } />
          <Route path="/dining/menu" element={
            <> <Navbar /> <DiningMenu /> <Footer /> </>
          } />
          <Route path="/dining/reserve" element={
            <> <Navbar /> <DiningReservation /> <Footer /> </>
          } />

          {/* Dynamic Details & Booking Pages */}
          <Route path="/hotels/:id" element={<HotelDetails />} />
          
          <Route path="/booking/:id" element={
            <> <Navbar /> <BookingDetails /> <Footer /> </>
          } />
          
          {/* Checkout Flow Routes */}
          <Route path="/checkout/:id" element={
            <> <Navbar /> <Checkout /> <Footer /> </>
          } />
          <Route path="/experience-checkout/:id" element={
            <> <Navbar /> <ExperienceCheckout /> <Footer /> </>
          } />

        </Routes>
      </Suspense>
    </>
  );
}

export default App;