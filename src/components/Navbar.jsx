import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, LogOut, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for dynamic background and text color
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatically close menus when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Rooms', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Spa', path: '/spa' },
    { name: 'Charters', path: '/charters' },
    { name: 'Events', path: '/events' },
    { name: 'Offers', path: '/offers' },
  ];

  // --- DYNAMIC STYLING LOGIC ---
  // If scrolled (or mobile menu open): Dark Background, White Text
  // If at top: White Background, Dark Text
  const navbarClasses = isScrolled || isMobileMenuOpen 
    ? 'bg-slate-900/95 backdrop-blur-md py-4 shadow-lg text-white' 
    : 'bg-white py-6 shadow-sm text-slate-900';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* 1. BRAND LOGO */}
        <Link to="/" className="text-2xl font-serif font-bold tracking-wider cursor-pointer z-50">
          LUXE<span className="text-yellow-500">STAY</span>
        </Link>

        {/* 2. DESKTOP LINKS */}
        <div className="hidden lg:flex space-x-8 text-sm font-bold tracking-wide uppercase">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`hover:text-yellow-500 transition-colors ${location.pathname === link.path ? 'text-yellow-500' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. ICONS & PROFILE AREA */}
        <div className="flex items-center space-x-6 z-50">
          <Link to="/search">
            <Search className="w-5 h-5 cursor-pointer hover:text-yellow-500 transition-colors" />
          </Link>
          
          {/* USER AUTH LOGIC */}
          {user ? (
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 rounded-full bg-yellow-500 text-slate-900 font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-yellow-500/20"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden text-slate-900 py-2"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-yellow-50 text-sm font-bold transition-colors">
                      <User className="w-4 h-4 text-yellow-600" /> My Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 font-bold text-red-600 text-sm transition-colors text-left border-t border-gray-50">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:block">
              <User className="w-5 h-5 cursor-pointer hover:text-yellow-500 transition-colors" />
            </Link>
          )}

          {/* 4. MOBILE TOGGLE BUTTON */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1">
            {isMobileMenuOpen ? <X className="w-6 h-6 text-yellow-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* --- MOBILE FULLSCREEN OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 lg:hidden flex flex-col pt-4 pb-8 shadow-2xl h-[calc(100vh-80px)] overflow-y-auto text-white"
          >
            <div className="flex flex-col px-6 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`text-xl font-serif py-4 border-b border-slate-800 flex items-center justify-between transition-colors ${location.pathname === link.path ? 'text-yellow-500' : 'text-white hover:text-yellow-400'}`}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-8 pb-4 mt-2">
                {user ? (
                  <div className="space-y-4">
                    <Link to="/profile" className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-yellow-500 text-slate-900 flex items-center justify-center font-serif font-bold text-xl shadow-md">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{user.name}</p>
                        <p className="text-xs uppercase tracking-wider text-yellow-500 font-bold">My Dashboard</p>
                      </div>
                    </Link>
                    <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors">
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center gap-2 w-full bg-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors shadow-lg"
                  >
                    <User className="w-5 h-5" /> Member Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;