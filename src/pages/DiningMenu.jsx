import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Clock, Star, MapPin, CheckCircle, Info, GlassWater, ChefHat, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK VENUE DATA ---
const venues = [
  {
    id: "zenith",
    name: "The Zenith",
    cuisine: "Michelin-Star Fine Dining",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    description: "Suspended on the 54th floor, offering a transcendent 9-course tasting menu with panoramic city views.",
    timeSlots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
    deposit: "$100 per person"
  },
  {
    id: "oceans",
    name: "Ocean's Edge",
    cuisine: "Mediterranean Seafood",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
    description: "Dine directly on the pristine sands. Specializing in the day's freshest catch grilled over open wood fires.",
    timeSlots: ["12:00", "12:30", "13:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"],
    deposit: "No deposit required"
  },
  {
    id: "amber",
    name: "The Amber Lounge",
    cuisine: "Rare Spirits & Tapas",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
    description: "Step into an era of classic glamour with live jazz, a curated humidor, and vintage champagnes.",
    timeSlots: ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    deposit: "Table minimum applies"
  }
];

// --- CALENDAR HELPER DATA ---
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const DiningReservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- COMPLEX FORM STATE ---
  const [formData, setFormData] = useState({
    venueId: 'zenith',
    date: null, // Now stores a proper Date object instead of a string
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    occasion: 'None',
    specialRequests: '',
    upgrades: {
      champagne: false,
      windowSeat: false,
      caviar: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- CUSTOM DATE PICKER STATE ---
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarRef = useRef(null);

  // Close calendar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Derived state for the sticky sidebar
  const selectedVenue = venues.find(v => v.id === formData.venueId);

  // --- CALENDAR LOGIC ---
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    setFormData(prev => ({ ...prev, date: selected, time: '' })); // Reset time on new date
    setShowCalendar(false);
  };

  const isDateDisabled = (day) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate day comparison
    return dateToCheck < today;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty slots for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const disabled = isDateDisabled(day);
      const isSelected = formData.date && 
                         formData.date.getDate() === day && 
                         formData.date.getMonth() === currentMonth && 
                         formData.date.getFullYear() === currentYear;

      days.push(
        <button
          key={day}
          type="button"
          disabled={disabled}
          onClick={() => handleDateSelect(day)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300
            ${disabled ? 'text-slate-700 cursor-not-allowed' : 'hover:bg-slate-800 text-slate-300'}
            ${isSelected ? 'bg-yellow-600 text-slate-950 hover:bg-yellow-500 shadow-lg shadow-yellow-600/20 font-bold' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpgradeToggle = (upgrade) => {
    setFormData(prev => ({
      ...prev,
      upgrades: { ...prev.upgrades, [upgrade]: !prev.upgrades[upgrade] }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  // Format date for display
  const formattedDate = formData.date 
    ? formData.date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
    : 'Select a Date';

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-light selection:bg-yellow-600/30 pb-24">
      
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl shadow-yellow-600/10"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Reservation Confirmed</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Thank you, {formData.name}. Your table for {formData.guests} at <span className="text-white font-bold">{selectedVenue.name}</span> on <span className="text-white font-bold">{formattedDate}</span> at <span className="text-white font-bold">{formData.time}</span> has been secured. A confirmation email has been sent.
              </p>
              <Link to="/dining" className="inline-block bg-yellow-600 text-slate-950 font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors">
                Return to Dining
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP NAV BAR */}
      <div className="pt-28 pb-6 px-6 container mx-auto max-w-7xl">
        <Link to="/dining" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-400 transition-colors text-sm font-bold uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Venues
        </Link>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: STICKY VENUE PREVIEW          */}
          {/* ========================================== */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8 space-y-6 hidden md:block z-10">
            <h1 className="text-4xl font-serif font-bold text-white mb-8">Secure Your Experience</h1>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedVenue.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl"
              >
                <div className="h-64 w-full relative">
                  <img src={selectedVenue.image} alt={selectedVenue.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-yellow-500 text-[10px] uppercase font-bold tracking-widest mb-1 block">{selectedVenue.cuisine}</span>
                    <h2 className="text-3xl font-serif font-bold text-white">{selectedVenue.name}</h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <p className="text-sm text-gray-400 leading-relaxed">{selectedVenue.description}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Info className="w-4 h-4 text-yellow-600" /> {selectedVenue.deposit}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Star className="w-4 h-4 text-yellow-600" /> Dress Code Strictly Enforced
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Need Assistance?</p>
              <p className="text-sm text-gray-400 mb-1">Contact our Maitre D' directly:</p>
              <p className="text-yellow-500 font-mono">+971 4 111 2233</p>
            </div>
          </div>


          {/* ========================================== */}
          {/* RIGHT COLUMN: MASSIVE BOOKING ENGINE       */}
          {/* ========================================== */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* SECTION 1: Select Venue */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl relative z-10">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">1</span> 
                  Select Venue
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {venues.map(venue => (
                    <div 
                      key={venue.id}
                      onClick={() => setFormData(prev => ({ ...prev, venueId: venue.id, time: '' }))}
                      className={`cursor-pointer border rounded-2xl p-4 transition-all duration-300 ${formData.venueId === venue.id ? 'bg-yellow-600/10 border-yellow-500 text-white shadow-lg shadow-yellow-600/10' : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-600'}`}
                    >
                      <h4 className={`font-bold mb-1 ${formData.venueId === venue.id ? 'text-yellow-500' : 'text-white'}`}>{venue.name}</h4>
                      <p className="text-xs line-clamp-2">{venue.cuisine}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: Party Size & THE CUSTOM DATE PICKER */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl relative z-30">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">2</span> 
                  Date & Party
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  
                  {/* --- BESPOKE CUSTOM DATE PICKER START --- */}
                  <div className="space-y-3 relative" ref={calendarRef}>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" /> Reservation Date
                    </label>
                    
                    {/* The Trigger Button */}
                    <button 
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`w-full flex items-center justify-between bg-slate-950 border rounded-xl px-4 py-4 text-left transition-colors ${showCalendar ? 'border-yellow-600 text-white' : 'border-slate-800 text-white hover:border-slate-600'} ${!formData.date && 'text-gray-500'}`}
                    >
                      <span>{formattedDate}</span>
                      <Calendar className={`w-5 h-5 ${formData.date ? 'text-yellow-600' : 'text-gray-500'}`} />
                    </button>

                    {/* The Calendar Popover */}
                    <AnimatePresence>
                      {showCalendar && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[85px] left-0 w-full sm:w-[320px] bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl z-50"
                        >
                          {/* Calendar Header */}
                          <div className="flex items-center justify-between mb-4">
                            <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300">
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h4 className="font-bold text-white text-lg font-serif">
                              {MONTHS[currentMonth]} {currentYear}
                            </h4>
                            <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Calendar Grid Header (Mon-Sun) */}
                          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                            {DAYS.map(day => (
                              <div key={day} className="text-xs font-bold text-gray-500 tracking-wider">
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Days */}
                          <div className="grid grid-cols-7 gap-1">
                            {renderCalendarDays()}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* --- BESPOKE CUSTOM DATE PICKER END --- */}

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Party Size
                    </label>
                    <select 
                      name="guests" 
                      value={formData.guests} 
                      onChange={handleInputChange} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="9+">9+ Guests (Group Booking)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Time Slot Grid */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl relative z-20">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">3</span> 
                  Select Time
                </h3>
                {formData.date ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {selectedVenue.timeSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, time }))}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all ${formData.time === time ? 'bg-yellow-600 text-slate-950 border-yellow-600 shadow-lg shadow-yellow-600/20' : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-600 hover:text-white'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-900/50 text-gray-500">
                    <Clock className="w-6 h-6 mx-auto mb-2 opacity-50 text-yellow-600" />
                    <p>Please select a date first to view available dining times.</p>
                  </div>
                )}
              </div>

              {/* SECTION 4: Guest Details & Upgrades */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl space-y-8 relative z-10">
                <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">4</span> 
                  Guest Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                  <input type="email" name="email" required placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                  <input type="tel" name="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                  <select name="occasion" value={formData.occasion} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors appearance-none cursor-pointer">
                    <option value="None">Standard Dining</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business">Business Meeting</option>
                  </select>
                </div>

                <textarea name="specialRequests" rows="3" placeholder="Dietary restrictions, seating preferences, or special requests..." value={formData.specialRequests} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors resize-none"></textarea>

                {/* VIP Enhancements Toggle */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Enhance Your Experience</h4>
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${formData.upgrades.windowSeat ? 'bg-yellow-600/10 border-yellow-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${formData.upgrades.windowSeat ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <div>
                          <p className={`font-bold ${formData.upgrades.windowSeat ? 'text-white' : 'text-gray-300'}`}>Priority Window Seating</p>
                          <p className="text-xs text-gray-500">Subject to availability upon arrival.</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-yellow-600 cursor-pointer" checked={formData.upgrades.windowSeat} onChange={() => handleUpgradeToggle('windowSeat')} />
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${formData.upgrades.champagne ? 'bg-yellow-600/10 border-yellow-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex items-center gap-3">
                        <GlassWater className={`w-5 h-5 ${formData.upgrades.champagne ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <div>
                          <p className={`font-bold ${formData.upgrades.champagne ? 'text-white' : 'text-gray-300'}`}>Dom Pérignon on Arrival</p>
                          <p className="text-xs text-gray-500">Chilled and poured as you are seated. (+$450)</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-yellow-600 cursor-pointer" checked={formData.upgrades.champagne} onChange={() => handleUpgradeToggle('champagne')} />
                    </label>
                  </div>
                </div>

              </div>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit" 
                disabled={isSubmitting || !formData.date || !formData.time}
                className="w-full bg-yellow-600 text-slate-950 font-bold text-lg py-5 rounded-full hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                ) : (
                  'Confirm Reservation'
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default DiningReservation;