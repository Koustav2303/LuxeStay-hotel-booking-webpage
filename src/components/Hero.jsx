import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ChevronDown, Plus, Minus } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  
  // 1. Search States
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  
  // 2. UI States
  const [activeField, setActiveField] = useState(null);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  // 3. Handle Search Button Click
  const handleSearch = () => {
    // Navigate to search page with the location query
    navigate(`/search?location=${location}&guests=${guests.adults + guests.children}`);
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden font-sans">
      
      {/* Background */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40" />
      </motion.div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
            The World's Best Hotels
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-white font-bold mb-6 drop-shadow-2xl tracking-tight leading-tight">
             <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 italic">Explore The World</span>
          </h1>
        </motion.div>

        {/* --- SEARCH BAR --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-[2rem] p-2 max-w-5xl w-full shadow-2xl flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-100 relative z-50"
        >
          
          {/* 1. Location Input */}
          <div 
            className={`flex-1 relative px-6 py-4 hover:bg-gray-50 transition-colors rounded-[1.5rem] cursor-pointer w-full md:w-auto ${activeField === 'location' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveField('location')}
          >
            <div className="flex items-center gap-3">
              <MapPin className="text-slate-900 w-5 h-5" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-wider">Location</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?" 
                  className="w-full bg-transparent outline-none text-sm font-medium text-gray-700 placeholder-gray-400" 
                />
              </div>
            </div>
          </div>

          {/* 2. Dates Input (Native Date Picker) */}
          <div 
            className={`flex-1 relative px-6 py-4 hover:bg-gray-50 transition-colors rounded-[1.5rem] cursor-pointer w-full md:w-auto ${activeField === 'dates' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveField('dates')}
          >
            <div className="flex items-center gap-3">
              <Calendar className="text-slate-900 w-5 h-5" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-wider">Check In</label>
                <input 
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-medium text-gray-700 uppercase" 
                />
              </div>
            </div>
          </div>

          {/* 3. Guests (With Dropdown) */}
          <div 
            className={`flex-1 relative px-6 py-4 hover:bg-gray-50 transition-colors rounded-[1.5rem] cursor-pointer w-full md:w-auto ${activeField === 'guests' ? 'bg-gray-100' : ''}`}
            onClick={() => {
                setActiveField('guests');
                setIsGuestOpen(!isGuestOpen);
            }}
          >
            <div className="flex items-center gap-3">
              <Users className="text-slate-900 w-5 h-5" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-wider">Guests</label>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {guests.adults + guests.children} Guests
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isGuestOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>

            {/* Guest Dropdown Popup */}
            <AnimatePresence>
                {isGuestOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-full md:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 mt-4 p-4 z-50 overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent close on click inside
                    >
                        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Adults</h4>
                                <p className="text-xs text-gray-400">Ages 13 or above</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setGuests(prev => ({...prev, adults: Math.max(1, prev.adults - 1)}))}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-bold w-4 text-center">{guests.adults}</span>
                                <button 
                                    onClick={() => setGuests(prev => ({...prev, adults: prev.adults + 1}))}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Children</h4>
                                <p className="text-xs text-gray-400">Ages 2 - 12</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setGuests(prev => ({...prev, children: Math.max(0, prev.children - 1)}))}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-bold w-4 text-center">{guests.children}</span>
                                <button 
                                    onClick={() => setGuests(prev => ({...prev, children: prev.children + 1}))}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* Search Button */}
          <div className="p-2 w-full md:w-auto">
            <button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-slate-900 hover:bg-yellow-500 hover:text-slate-900 text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2 group"
            >
              <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Hero;