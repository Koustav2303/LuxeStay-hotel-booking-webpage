import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar as CalendarIcon, Users, ChevronDown, Plus, Minus, ChevronLeft, ChevronRight, Compass, Map } from 'lucide-react';

// --- HIGH-RES LUXURY IMAGES (Unsplash) ---
const images = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop"
];

const trendingLocations = [
  { name: "Palm Jumeirah, Dubai", icon: <MapPin className="w-4 h-4" /> },
  { name: "Santorini, Greece", icon: <Compass className="w-4 h-4" /> },
  { name: "Aspen, Colorado", icon: <Map className="w-4 h-4" /> },
  { name: "Maldives, Indian Ocean", icon: <MapPin className="w-4 h-4" /> }
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Hero = () => {
  const navigate = useNavigate();
  const searchBarRef = useRef(null);

  // 1. Image Cycle State
  const [currentBg, setCurrentBg] = useState(0);

  // 2. Search States
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  
  // 3. UI States
  const [activeField, setActiveField] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dateSelectionStep, setDateSelectionStep] = useState('checkIn');

  // --- CINEMATIC SLIDESHOW LOGIC ---
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % images.length);
    }, 7000); // Transitions every 7 seconds
    return () => clearInterval(bgTimer);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- CALENDAR HELPERS ---
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleDateSelect = (day, e) => {
    e.stopPropagation();
    const selectedDate = new Date(currentYear, currentMonth, day);
    if (dateSelectionStep === 'checkIn') {
      setCheckIn(selectedDate);
      setCheckOut(null);
      setDateSelectionStep('checkOut');
    } else {
      if (selectedDate > checkIn) {
        setCheckOut(selectedDate);
        setActiveField('guests');
      } else {
        setCheckIn(selectedDate);
        setCheckOut(null);
      }
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const disabled = currentDate < new Date().setHours(0,0,0,0);
      const isCheckIn = checkIn && currentDate.getTime() === checkIn.getTime();
      const isCheckOut = checkOut && currentDate.getTime() === checkOut.getTime();
      const isInRange = checkIn && checkOut && currentDate > checkIn && currentDate < checkOut;

      days.push(
        <div key={day} className={`w-10 h-10 flex items-center justify-center relative ${isInRange ? 'bg-yellow-600/10' : ''}`}>
          <button
            type="button"
            disabled={disabled}
            onClick={(e) => handleDateSelect(day, e)}
            className={`w-full h-full flex items-center justify-center rounded-full text-sm font-medium transition-all
              ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'}
              ${isCheckIn || isCheckOut ? 'bg-slate-900 text-white shadow-lg' : ''}
            `}
          >
            {day}
          </button>
        </div>
      );
    }
    return days;
  };

  const handleSearch = () => {
    navigate(`/search?location=${location}&guests=${guests.adults + guests.children}`);
  };

  return (
    <div className="relative h-[95vh] w-full font-sans overflow-hidden bg-slate-950">
      
      {/* 1. CINEMATIC IMAGE SLIDESHOW WITH ZOOM EFFECT */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.08 }} // Start slightly zoomed in
            animate={{ opacity: 1, scale: 1 }}     // Slowly zoom out to normal
            exit={{ opacity: 0 }}                  // Fade out
            transition={{ 
              opacity: { duration: 1.5 },          // Smooth crossfade
              scale: { duration: 8, ease: "easeOut" } // Slow dramatic zoom
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${images[currentBg]}')` }}
          />
        </AnimatePresence>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-20">
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
            Redefining Luxury Travel
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white font-bold mb-6 drop-shadow-2xl">
            The World <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600 italic font-light">Is Yours To Explore</span>
          </h1>
        </motion.div>

        {/* --- DYNAMIC SEARCH BAR --- */}
        <motion.div 
          ref={searchBarRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-2 max-w-6xl w-full shadow-2xl flex flex-col md:flex-row items-center relative"
        >
          
          {/* Location */}
          <div className={`flex-1 relative px-8 py-5 transition-all rounded-[2rem] cursor-pointer w-full md:w-auto ${activeField === 'location' ? 'bg-white shadow-lg z-10' : 'hover:bg-gray-50'}`} onClick={() => setActiveField('location')}>
            <div className="flex items-center gap-4 text-left">
              <MapPin className={`w-5 h-5 ${activeField === 'location' ? 'text-yellow-600' : 'text-slate-400'}`} />
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where to?" className="w-full bg-transparent outline-none text-sm font-bold text-slate-900 placeholder-gray-300" />
              </div>
            </div>
            <AnimatePresence>
              {activeField === 'location' && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[110%] left-0 w-full md:w-[320px] bg-white rounded-3xl shadow-2xl p-6 z-50 border border-gray-100">
                  {trendingLocations.map((loc, i) => (
                    <div key={i} onClick={(e) => { e.stopPropagation(); setLocation(loc.name); setActiveField('dates'); }} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-yellow-100 transition-colors text-slate-400 group-hover:text-yellow-700">{loc.icon}</div>
                      <span className="text-sm font-bold text-slate-700">{loc.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          {/* Dates */}
          <div className={`flex-[1.5] relative px-8 py-5 transition-all rounded-[2rem] cursor-pointer w-full md:w-auto ${activeField === 'dates' ? 'bg-white shadow-lg z-10' : 'hover:bg-gray-50'}`} onClick={() => setActiveField('dates')}>
            <div className="flex items-center gap-4 text-left">
              <CalendarIcon className={`w-5 h-5 ${activeField === 'dates' ? 'text-yellow-600' : 'text-slate-400'}`} />
              <div className="flex justify-between w-full">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Check In</label>
                  <p className="text-sm font-bold text-slate-900">{checkIn ? checkIn.toLocaleDateString('en-US', {month:'short', day:'numeric'}) : 'Add Date'}</p>
                </div>
                <div className="w-px h-8 bg-gray-100 mx-4"></div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Check Out</label>
                  <p className="text-sm font-bold text-slate-900">{checkOut ? checkOut.toLocaleDateString('en-US', {month:'short', day:'numeric'}) : 'Add Date'}</p>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {activeField === 'dates' && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[110%] left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[92vw] md:w-[380px] bg-white rounded-3xl shadow-2xl p-6 z-50 border border-gray-100" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setCurrentMonth(m => m === 0 ? 11 : m - 1)} className="p-2 hover:bg-slate-50 rounded-full"><ChevronLeft className="w-4 h-4"/></button>
                    <h4 className="font-serif font-bold text-slate-900">{MONTHS[currentMonth]} {currentYear}</h4>
                    <button onClick={() => setCurrentMonth(m => m === 11 ? 0 : m + 1)} className="p-2 hover:bg-slate-50 rounded-full"><ChevronRight className="w-4 h-4"/></button>
                  </div>
                  <div className="grid grid-cols-7 gap-y-1">{renderCalendarDays()}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          {/* Guests */}
          <div className={`flex-1 relative px-8 py-5 transition-all rounded-[2rem] cursor-pointer w-full md:w-auto ${activeField === 'guests' ? 'bg-white shadow-lg z-10' : 'hover:bg-gray-50'}`} onClick={() => setActiveField('guests')}>
            <div className="flex items-center gap-4 text-left">
              <Users className={`w-5 h-5 ${activeField === 'guests' ? 'text-yellow-600' : 'text-slate-400'}`} />
              <div className="w-full">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Travelers</label>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">{guests.adults + guests.children} Guests</span>
                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            </div>
            <AnimatePresence>
              {activeField === 'guests' && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[110%] right-0 w-full md:w-[300px] bg-white rounded-3xl shadow-2xl p-6 z-50 border border-gray-100" onClick={e => e.stopPropagation()}>
                  {[
                    { label: 'Adults', sub: 'Ages 13+', key: 'adults', min: 1 },
                    { label: 'Children', sub: 'Ages 2-12', key: 'children', min: 0 }
                  ].map((type) => (
                    <div key={type.key} className="flex justify-between items-center py-4 first:pt-0 border-b border-gray-50 last:border-0 last:pb-0">
                      <div><h5 className="font-bold text-slate-800 text-sm">{type.label}</h5><p className="text-[10px] text-gray-400">{type.sub}</p></div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setGuests(p => ({...p, [type.key]: Math.max(type.min, p[type.key]-1)}))} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-slate-50"><Minus className="w-3 h-3"/></button>
                        <span className="font-bold text-sm w-4 text-center">{guests[type.key]}</span>
                        <button onClick={() => setGuests(p => ({...p, [type.key]: p[type.key]+1}))} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-slate-50"><Plus className="w-3 h-3"/></button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- FIXED SEARCH BUTTON (Magnifier) --- */}
          <div className="p-2 w-full md:w-auto flex-shrink-0">
            <button 
              onClick={handleSearch}
              className="w-full md:w-16 h-16 bg-slate-900 hover:bg-yellow-500 hover:text-slate-900 text-white rounded-full transition-all shadow-xl flex items-center justify-center flex-shrink-0 group"
            >
              <Search className="w-6 h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Hero;