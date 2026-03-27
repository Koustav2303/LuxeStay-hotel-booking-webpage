import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CalendarDays, Users, Shield, Plane, MapPin, CheckCircle, Info, Car, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK FLEET DATA ---
const fleet = [
  {
    id: "gulfstream",
    title: "Gulfstream G650ER",
    type: "Private Aviation",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop",
    description: "Ultra-long-range flight experience in a whisper-quiet, pressurized cabin. Fly non-stop from New York to Dubai.",
    specs: "Mach 0.90 | 7,500 nm Range | 14 Pax",
    notice: "Requires 12 hours advance notice for international routing."
  },
  {
    id: "azimut",
    title: "Azimut Grande 27M",
    type: "Luxury Yacht",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2074&auto=format&fit=crop",
    description: "88-foot motor yacht featuring an expansive flybridge, private chef, and bespoke interior styling.",
    specs: "24 Knots | 4 Staterooms | 10 Pax",
    notice: "Available for day charters or weekly Mediterranean voyages."
  },
  {
    id: "agusta",
    title: "AgustaWestland AW139",
    type: "VIP Helicopter",
    image: "https://images.unsplash.com/photo-1525034674686-2187741eb5fb?q=80&w=2070&auto=format&fit=crop",
    description: "Swift, scenic transfers directly from the international airport to the resort's private helipad.",
    specs: "165 Knots | Twin-Engine | 6 Pax",
    notice: "Subject to ATC clearance and weather minimums."
  }
];

// --- CALENDAR HELPER DATA ---
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CharterInquiry = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- COMPLEX FORM STATE ---
  const [formData, setFormData] = useState({
    assetId: 'gulfstream',
    date: null,
    departure: '',
    destination: '',
    passengers: '2',
    name: '',
    email: '',
    phone: '',
    details: '',
    upgrades: {
      chauffeur: false,
      catering: false,
      security: false
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
      if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedAsset = fleet.find(f => f.id === formData.assetId);

  // --- CALENDAR LOGIC ---
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } 
    else { setCurrentMonth(currentMonth - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } 
    else { setCurrentMonth(currentMonth + 1); }
  };

  const handleDateSelect = (day) => {
    setFormData(prev => ({ ...prev, date: new Date(currentYear, currentMonth, day) })); 
    setShowCalendar(false);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateToCheck = new Date(currentYear, currentMonth, day);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const disabled = dateToCheck < today;
      const isSelected = formData.date && formData.date.getDate() === day && formData.date.getMonth() === currentMonth && formData.date.getFullYear() === currentYear;
      days.push(
        <button key={day} type="button" disabled={disabled} onClick={() => handleDateSelect(day)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300
            ${disabled ? 'text-slate-700 cursor-not-allowed' : 'hover:bg-slate-800 text-slate-300'}
            ${isSelected ? 'bg-yellow-600 text-slate-950 hover:bg-yellow-500 shadow-lg shadow-yellow-600/20 font-bold' : ''}`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleUpgradeToggle = (upgrade) => setFormData(prev => ({ ...prev, upgrades: { ...prev.upgrades, [upgrade]: !prev.upgrades[upgrade] } }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); }, 2500);
  };

  const formattedDate = formData.date ? formData.date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select Departure Date';

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-light selection:bg-yellow-600/30 pb-24">
      
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl shadow-yellow-600/10">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20"><CheckCircle className="w-10 h-10 text-green-500" /></div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Manifest Received</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Thank you, {formData.name}. Our Director of Logistics is reviewing your routing for the <span className="text-white font-bold">{selectedAsset.title}</span>. A comprehensive flight/voyage itinerary will be sent to your executive email within 2 hours.
              </p>
              <Link to="/charters" className="inline-block bg-yellow-600 text-slate-950 font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors">Return to Charters</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP NAV BAR */}
      <div className="pt-28 pb-6 px-6 container mx-auto max-w-7xl">
        <Link to="/charters" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-400 transition-colors text-sm font-bold uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Fleet
        </Link>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: STICKY ASSET PREVIEW          */}
          {/* ========================================== */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8 space-y-6 hidden md:block z-10">
            <h1 className="text-4xl font-serif font-bold text-white mb-8">Logistics & Planning</h1>
            
            <AnimatePresence mode="wait">
              <motion.div key={selectedAsset.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
                <div className="h-64 w-full relative">
                  <img src={selectedAsset.image} alt={selectedAsset.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-yellow-500 text-[10px] uppercase font-bold tracking-widest mb-1 block">{selectedAsset.type}</span>
                    <h2 className="text-3xl font-serif font-bold text-white leading-tight">{selectedAsset.title}</h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <p className="text-sm text-gray-400 leading-relaxed">{selectedAsset.description}</p>
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 text-sm text-gray-300 font-bold"><Plane className="w-4 h-4 text-yellow-600" /> {selectedAsset.specs}</div>
                    <div className="flex items-center gap-3 text-sm text-gray-400"><Info className="w-4 h-4 text-yellow-600" /> {selectedAsset.notice}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Aviation & Marine Desk</p>
              <p className="text-yellow-500 font-mono">+1 (800) 555-JETS</p>
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: MASSIVE INQUIRY ENGINE       */}
          {/* ========================================== */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* SECTION 1: Asset Selection */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl relative z-10">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">1</span> Asset Required
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {fleet.map(asset => (
                    <div key={asset.id} onClick={() => setFormData(prev => ({ ...prev, assetId: asset.id }))}
                      className={`cursor-pointer border rounded-2xl p-4 transition-all duration-300 ${formData.assetId === asset.id ? 'bg-yellow-600/10 border-yellow-500 text-white shadow-lg shadow-yellow-600/10' : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-600'}`}
                    >
                      <h4 className={`font-bold mb-1 line-clamp-1 ${formData.assetId === asset.id ? 'text-yellow-500' : 'text-white'}`}>{asset.title}</h4>
                      <p className="text-xs">{asset.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: Routing & Schedule */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl relative z-30">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">2</span> Itinerary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> Departure City / FBO</label>
                    <input type="text" name="departure" required placeholder="e.g. Teterboro (KTEB)" value={formData.departure} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> Destination City / Port</label>
                    <input type="text" name="destination" required placeholder="e.g. Monaco (MCM)" value={formData.destination} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* CUSTOM DATE PICKER */}
                  <div className="space-y-3 relative" ref={calendarRef}>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Departure Date</label>
                    <button type="button" onClick={() => setShowCalendar(!showCalendar)} className={`w-full flex items-center justify-between bg-slate-950 border rounded-xl px-4 py-4 text-left transition-colors ${showCalendar ? 'border-yellow-600 text-white' : 'border-slate-800 text-white hover:border-slate-600'} ${!formData.date && 'text-gray-500'}`}>
                      <span>{formattedDate}</span> <CalendarDays className={`w-5 h-5 ${formData.date ? 'text-yellow-600' : 'text-gray-500'}`} />
                    </button>
                    <AnimatePresence>
                      {showCalendar && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[85px] left-0 w-full sm:w-[320px] bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl z-50">
                          <div className="flex items-center justify-between mb-4">
                            <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-slate-800 rounded-full text-slate-300"><ChevronLeft className="w-5 h-5" /></button>
                            <h4 className="font-bold text-white text-lg font-serif">{MONTHS[currentMonth]} {currentYear}</h4>
                            <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-slate-800 rounded-full text-slate-300"><ChevronRight className="w-5 h-5" /></button>
                          </div>
                          <div className="grid grid-cols-7 gap-1 mb-2 text-center">{DAYS.map(d => <div key={d} className="text-xs font-bold text-gray-500 tracking-wider">{d}</div>)}</div>
                          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2"><Users className="w-4 h-4" /> Pax (Passengers)</label>
                    <input type="number" name="passengers" required min="1" max="14" placeholder="Number of guests" value={formData.passengers} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Principal / Executive Details */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl space-y-8 relative z-10">
                <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">3</span> Principal Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" required placeholder="Lead Passenger / Exec Name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                  <input type="email" name="email" required placeholder="Assistant / Exec Email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                </div>
                
                <input type="tel" name="phone" required placeholder="Direct Contact Number" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" />
                <textarea name="details" rows="3" placeholder="Additional requirements, catering preferences, or return flight details..." value={formData.details} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors resize-none"></textarea>

                {/* VIP Enhancements */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Executive Logistics</h4>
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${formData.upgrades.chauffeur ? 'bg-yellow-600/10 border-yellow-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex items-center gap-3">
                        <Car className={`w-5 h-5 ${formData.upgrades.chauffeur ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <div>
                          <p className={`font-bold ${formData.upgrades.chauffeur ? 'text-white' : 'text-gray-300'}`}>Tarmac Chauffeur Transfer</p>
                          <p className="text-xs text-gray-500">Armored S-Class or Escalade waiting planeside.</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-yellow-600 cursor-pointer" checked={formData.upgrades.chauffeur} onChange={() => handleUpgradeToggle('chauffeur')} />
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${formData.upgrades.catering ? 'bg-yellow-600/10 border-yellow-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex items-center gap-3">
                        <Utensils className={`w-5 h-5 ${formData.upgrades.catering ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <div>
                          <p className={`font-bold ${formData.upgrades.catering ? 'text-white' : 'text-gray-300'}`}>Michelin-Star In-Flight Catering</p>
                          <p className="text-xs text-gray-500">Bespoke menu tailored to your exact dietary requirements.</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-yellow-600 cursor-pointer" checked={formData.upgrades.catering} onChange={() => handleUpgradeToggle('catering')} />
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${formData.upgrades.security ? 'bg-yellow-600/10 border-yellow-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex items-center gap-3">
                        <Shield className={`w-5 h-5 ${formData.upgrades.security ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <div>
                          <p className={`font-bold ${formData.upgrades.security ? 'text-white' : 'text-gray-300'}`}>Close Protection Detail</p>
                          <p className="text-xs text-gray-500">Executive security personnel from departure to arrival.</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-yellow-600 cursor-pointer" checked={formData.upgrades.security} onChange={() => handleUpgradeToggle('security')} />
                    </label>
                  </div>
                </div>

              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" disabled={isSubmitting || !formData.date || !formData.departure || !formData.destination} className="w-full bg-yellow-600 text-slate-950 font-bold text-lg py-5 rounded-full hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isSubmitting ? <div className="w-6 h-6 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" /> : 'Request Flight/Voyage Manifest'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharterInquiry;