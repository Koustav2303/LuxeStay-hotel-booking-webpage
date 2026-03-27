import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Footer from './components/Footer';

// Core Page Components
import HotelDetails from './pages/HotelDetails';
import SearchResults from './pages/SearchResults';
import Rooms from './pages/Rooms';
import Experiences from './pages/Experiences';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

// Booking & Checkout Components
import Checkout from './pages/Checkout'; 
import ExperienceCheckout from './pages/ExperienceCheckout';
import BookingDetails from './pages/BookingDetails'; 

// Events Ecosystem
import Events from './pages/Events'; 
import EventFloorplan from './pages/EventFloorplan'; 
import CustomRendering from './pages/CustomRendering'; // NEW CUSTOM RENDERING IMPORT

// Charters Ecosystem
import Charters from './pages/Charters';
import CharterInquiry from './pages/CharterInquiry'; 

// Spa Ecosystem
import Spa from './pages/Spa';
import SpaReservation from './pages/SpaReservation'; 

// Dining Ecosystem
import Dining from './pages/Dining'; 
import DiningMenu from './pages/DiningMenu'; 
import DiningReservation from './pages/DiningReservation'; 

// Offers Page
import Offers from './pages/Offers'; 

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Home Page Component
const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Featured />
    <Footer />
  </>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Core Navigation Pages */}
        <Route path="/rooms" element={
          <> <Navbar /> <Rooms /> <Footer /> </>
        } />

        <Route path="/experiences" element={
          <> <Navbar /> <Experiences /> <Footer /> </>
        } />

        <Route path="/offers" element={
          <> <Navbar /> <Offers /> <Footer /> </>
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

        {/* Utility Pages */}
        <Route path="/search" element={
          <> <Navbar /> <SearchResults /> <Footer /> </>
        } />

        <Route path="/profile" element={
          <> <Navbar /> <Profile /> <Footer /> </>
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

        {/* Authentication Route */}
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;