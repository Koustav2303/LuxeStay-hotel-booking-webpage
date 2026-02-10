import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-slate-900/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center text-white">
        
        <Link to="/" className="text-2xl font-serif font-bold tracking-wider cursor-pointer z-50">
          LUXE<span className="text-yellow-500">STAY</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-light tracking-wide">
          <Link to="/" className="hover:text-yellow-500 transition-colors">Destinations</Link>
          <Link to="/rooms" className="hover:text-yellow-500 transition-colors">Rooms</Link>
          <Link to="/experiences" className="hover:text-yellow-500 transition-colors">Experiences</Link>
        </div>

        {/* Icons Area */}
        <div className="flex items-center space-x-6 z-50">
          <Link to="/search">
            <Search className="w-5 h-5 cursor-pointer hover:text-yellow-500 transition-colors" />
          </Link>
          
          {/* USER LOGIC */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 rounded-full bg-yellow-500 text-slate-900 font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-yellow-500/20"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden text-slate-900 py-2"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 hover:bg-yellow-50 text-sm transition-colors">
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600 text-sm transition-colors text-left">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login">
              <User className="w-5 h-5 cursor-pointer hover:text-yellow-500 transition-colors" />
            </Link>
          )}

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            {isMobileMenuOpen ? <X className="w-6 h-6 text-yellow-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 md:hidden flex flex-col items-center py-8 space-y-6 shadow-2xl h-screen"
            >
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-yellow-500 transition-colors">Destinations</Link>
            <Link to="/rooms" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-yellow-500 transition-colors">Rooms & Suites</Link>
            <Link to="/experiences" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-yellow-500 transition-colors">Experiences</Link>
            {!user && <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-yellow-500 transition-colors">Sign In</Link>}
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;