import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Footer from './components/Footer';

// Page Components
import HotelDetails from './pages/HotelDetails';
import SearchResults from './pages/SearchResults';
import Rooms from './pages/Rooms';
import Experiences from './pages/Experiences';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

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
        <Route path="/" element={<Home />} />
        
        <Route path="/rooms" element={
          <> <Navbar /> <Rooms /> <Footer /> </>
        } />

        <Route path="/experiences" element={
          <> <Navbar /> <Experiences /> <Footer /> </>
        } />

        <Route path="/search" element={
          <> <Navbar /> <SearchResults /> <Footer /> </>
        } />

        <Route path="/profile" element={
          <> <Navbar /> <Profile /> <Footer /> </>
        } />

        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;