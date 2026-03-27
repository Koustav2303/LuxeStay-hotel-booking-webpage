import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Star, CheckCircle, Info, Sparkles, Droplets, Wind, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK SPA TREATMENT DATA ---
const treatments = [
  {
    id: "celestial",
    name: "The Celestial Journey",
    category: "Signature Body Therapy",
    duration: "120 Min",
    price: "$350",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
    description: "A full-body exfoliation with crushed pearls, followed by a warm basalt stone massage and wild-harvested argan oil scalp treatment.",
    timeSlots: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "07:00 PM"],
    icon: <Droplets className="w-5 h-5 text-yellow-500" />
  },
  {
    id: "gold-facial",
    name: "Luminous 24K Gold Facial",
    category: "Advanced Skincare",
    duration: "90 Min",
    price: "$420",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
    description: "A decadent, age-defying treatment using pure 24-karat gold leaf, micro-current lifting, and botanical collagen masks.",
    timeSlots: ["10:00 AM", "11:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"],
    icon: <Sparkles className="w-5 h-5 text-yellow-500" />
  },
  {
    id: "ocean-detox",
    name: "Deep Ocean Detox Wrap",
    category: "Purification Ritual",
    duration: "75 Min",
    price: "$280",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    description: "Dry brush lymphatic stimulation followed by a warm, mineral-rich marine algae cocoon and a deeply relaxing reflexology foot massage.",
    timeSlots: ["09:30 AM", "11:00 AM", "12:30 PM", "02:30 PM", "04:00 PM", "06:00 PM"],
    icon: <Wind className="w-5 h-5 text-yellow-500" />
  }
];

// --- CALENDAR HELPER DATA ---
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const SpaReservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- COMPLEX FORM STATE ---
  const [formData, setFormData] = useState({
    treatmentId: 'celestial',
    date: null,
    time: '',
    therapist: 'No Preference',
    name: '',
    email: '',
    phone: '',
    healthNotes: '',
    upgrades: {
      aromatherapy: false,
      hotStones: false,
      cbd: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- CUSTOM DATE PICKER STATE ---
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedTreatment = treatments.find(t => t.id === formData.treatmentId);

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
    setFormData(prev => ({ ...prev, date: selected, time: '' })); 
    setShowCalendar(false);
  };

  const isDateDisabled = (day) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return dateToCheck < today;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

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
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Journey Confirmed</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Thank you, {formData.name}. Your <span className="text-white font-bold">{selectedTreatment.name}</span> on <span className="text-white font-bold">{formattedDate}</span> at <span className="text-white font-bold">{formData.time}</span> has been scheduled. Please arrive 15 minutes early to enjoy our thermal facilities.
              </p>
              <Link to="/spa" className="inline-block bg-yellow-600 text-slate-950 font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors">
                Return to Sanctuary
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP NAV BAR */}
      <div className="pt-28 pb-6 px-6 container mx-auto max-w-7xl">
        <Link to="/spa" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-400 transition-colors text-sm font-bold uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Spa Menu
        </Link>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: STICKY TREATMENT PREVIEW      */}
          {/* ========================================== */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8 space-y-6 hidden md:block z-10">
            <h1 className="text-4xl font-serif font-bold text-white mb-8">Curate Your Retreat</h1>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedTreatment.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl"
              >
                <div className="h-64 w-full relative">
                  <img src={selectedTreatment.image} alt={selectedTreatment.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-yellow-500 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
                      {selectedTreatment.icon} {selectedTreatment.category}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-white leading-tight mt-1">{selectedTreatment.name}</h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <p className="text-sm text-gray-400 leading-relaxed">{selectedTreatment.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-sm text-gray-300 font-bold">
                      <Clock className="w-4 h-4 text-yellow-600" /> {selectedTreatment.duration}
                    </div>
                    <div className="text-xl font-bold text-yellow-500">
                      {selectedTreatment.price}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Spa Concierge</p>
              <p className="text-sm text-gray-400 mb-1">For bespoke wellness journeys, contact us directly:</p>
              <p className="text-yellow-500 font-mono">+971 4 222 5555</p>
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: MASSIVE BOOKING ENGINE       */}
          {/* ========================================== */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* SECTION 1: Select Treatment */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl relative z-10">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">1</span> 
                  Select Therapy
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {treatments.map(treatment => (
                    <div 
                      key={treatment.id}
                      onClick={() => setFormData(prev => ({ ...prev, treatmentId: treatment.id, time: '' }))}
                      className={`cursor-pointer border rounded-2xl p-4 transition-all duration-300 ${formData.treatmentId === treatment.id ? 'bg-yellow-600/10 border-yellow-500 text-white shadow-lg shadow-yellow-600/10' : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-600'}`}
                    >
                      <h4 className={`font-bold mb-1 line-clamp-1 ${formData.treatmentId === treatment.id ? 'text-yellow-500' : 'text-white'}`}>{treatment.name}</h4>
                      <p className="text-xs">{treatment.duration} | {treatment.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: Date & Therapist Preference */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl relative z-30">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">2</span> 
                  Date & Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  
                  {/* --- BESPOKE CUSTOM DATE PICKER START --- */}
                  <div className="space-y-3 relative" ref={calendarRef}>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" /> Requested Date
                    </label>
                    
                    <button 
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`w-full flex items-center justify-between bg-slate-950 border rounded-xl px-4 py-4 text-left transition-colors ${showCalendar ? 'border-yellow-600 text-white' : 'border-slate-800 text-white hover:border-slate-600'} ${!formData.date && 'text-gray-500'}`}
                    >
                      <span>{formattedDate}</span>
                      <Calendar className={`w-5 h-5 ${formData.date ? 'text-yellow-600' : 'text-gray-500'}`} />
                    </button>

                    <AnimatePresence>
                      {showCalendar && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[85px] left-0 w-full sm:w-[320px] bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl z-50"
                        >
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

                          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                            {DAYS.map(day => (
                              <div key={day} className="text-xs font-bold text-gray-500 tracking-wider">
                                {day}
                              </div>
                            ))}
                          </div>

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
                      <User className="w-4 h-4" /> Therapist Preference
                    </label>
                    <select 
                      name="therapist" 
                      value={formData.therapist} 
                      onChange={handleInputChange} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="No Preference">No Preference</option>
                      <option value="Female Therapist">Female Therapist</option>
                      <option value="Male Therapist">Male Therapist</option>
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {selectedTreatment.timeSlots.map(time => (
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
                    <p>Please select a date first to view available appointment times.</p>
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
                </div>
                
                <input type="tel" name="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />

                <textarea name="healthNotes" rows="3" placeholder="Please mention any allergies, injuries, or health conditions our therapists should be aware of..." value={formData.healthNotes} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors resize-none"></textarea>

                {/* VIP Enhancements Toggle */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Wellness Enhancements</h4>
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${formData.upgrades.aromatherapy ? 'bg-yellow-600/10 border-yellow-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex items-center gap-3">
                        <Sparkles className={`w-5 h-5 ${formData.upgrades.aromatherapy ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <div>
                          <p className={`font-bold ${formData.upgrades.aromatherapy ? 'text-white' : 'text-gray-300'}`}>Bespoke Aromatherapy Blend</p>
                          <p className="text-xs text-gray-500">Customized essential oils tailored to your mood. (+$25)</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-yellow-600 cursor-pointer" checked={formData.upgrades.aromatherapy} onChange={() => handleUpgradeToggle('aromatherapy')} />
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${formData.upgrades.cbd ? 'bg-yellow-600/10 border-yellow-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex items-center gap-3">
                        <Wind className={`w-5 h-5 ${formData.upgrades.cbd ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <div>
                          <p className={`font-bold ${formData.upgrades.cbd ? 'text-white' : 'text-gray-300'}`}>CBD Muscle Recovery Add-on</p>
                          <p className="text-xs text-gray-500">Targeted application for deep tissue inflammation. (+$45)</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-yellow-600 cursor-pointer" checked={formData.upgrades.cbd} onChange={() => handleUpgradeToggle('cbd')} />
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
                  'Confirm Booking'
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default SpaReservation;