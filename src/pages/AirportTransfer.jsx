import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Car, PlaneLanding, PlaneTakeoff, Users, Briefcase, Clock, Shield, Wifi, CheckCircle, MapPin, Star, Coffee, Sparkles, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- EXPANDED PREMIUM FLEET DATA ---
const fleet = [
  {
    id: "maybach",
    title: "Mercedes-Maybach S-Class",
    category: "Executive Sedan",
    baseRate: 250,
    image: "https://images.unsplash.com/photo-1632823469328-3e4032015d78?w=800&auto=format&fit=crop&q=80",
    description: "The pinnacle of chauffeur-driven luxury. Features reclining rear seats, multi-zone climate control, ambient lighting, and complimentary champagne.",
    specs: [
      { label: "2 Guests", icon: <Users className="w-4 h-4" /> },
      { label: "2 Large Bags", icon: <Briefcase className="w-4 h-4" /> }
    ],
    inclusions: ["Evian Water", "Laurent-Perrier", "Hot Towels", "5G Wi-Fi"]
  },
  {
    id: "phantom",
    title: "Rolls-Royce Phantom",
    category: "Ultra-Luxury Sedan",
    baseRate: 450,
    image: "https://images.unsplash.com/photo-1728458664282-0d028d4941f5?q=80&w=1139&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Make an unforgettable entrance. The Phantom offers the legendary 'magic carpet ride' experience with a Starlight Headliner and unparalleled acoustic insulation.",
    specs: [
      { label: "3 Guests", icon: <Users className="w-4 h-4" /> },
      { label: "3 Large Bags", icon: <Briefcase className="w-4 h-4" /> }
    ],
    inclusions: ["Dom Pérignon", "Beluga Caviar", "Starlight Roof", "Privacy Curtains"]
  },
  {
    id: "range-rover",
    title: "Range Rover Autobiography",
    category: "Luxury SUV",
    baseRate: 300,
    image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Range-Rover/11540/1719037980777/front-left-side-47.jpg?imwidth=600&impolicy=resize",
    description: "Commanding presence with exceptional comfort. Ideal for families or guests with additional luggage, offering elevated panoramic views.",
    specs: [
      { label: "4 Guests", icon: <Users className="w-4 h-4" /> },
      { label: "4 Large Bags", icon: <Briefcase className="w-4 h-4" /> }
    ],
    inclusions: ["Chilled Beverages", "Massage Seats", "Panoramic Roof"]
  },
  {
    id: "escalade",
    title: "Cadillac Escalade ESV",
    category: "Premium Extended SUV",
    baseRate: 275,
    image: "https://media.ed.edmunds-media.com/cadillac/escalade/2026/oem/2026_cadillac_escalade_4dr-suv_platinum-sport_fq_oem_1_1280.jpg",
    description: "The ultimate in spacious luxury. The extended wheelbase provides massive legroom and luggage capacity without sacrificing premium aesthetics.",
    specs: [
      { label: "6 Guests", icon: <Users className="w-4 h-4" /> },
      { label: "6 Large Bags", icon: <Briefcase className="w-4 h-4" /> }
    ],
    inclusions: ["AKG Studio Audio", "Rear Entertainment", "Extra Legroom"]
  },
  {
    id: "sprinter",
    title: "Mercedes-Benz VIP Sprinter",
    category: "Executive Transport",
    baseRate: 350,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOyIlZtnHAv_OK0qGYsMMa-xWJQMBH7NJs5Q&s",
    description: "Travel together without compromising on luxury. Features captain's chairs, dual climate zones, privacy partitions, and onboard entertainment.",
    specs: [
      { label: "8 Guests", icon: <Users className="w-4 h-4" /> },
      { label: "8+ Large Bags", icon: <Briefcase className="w-4 h-4" /> }
    ],
    inclusions: ["Captain's Chairs", "Apple TV", "Privacy Partition", "Mini-Bar"]
  }
];

// --- CALENDAR HELPER DATA ---
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const AirportTransfer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FORM STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCar, setSelectedCar] = useState(fleet[0]); 

  const [formData, setFormData] = useState({
    direction: 'arrival',
    date: null, // Changed from string to Date object
    time: '',
    flightNumber: '',
    passengers: '1',
    luggage: '1',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    meetAndGreet: true
  });

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
    setFormData(prev => ({ ...prev, date: selected }));
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
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300
            ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'}
            ${isSelected ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    return days;
  };


  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };
  
  const handleDirectionChange = (direction) => {
    setFormData(prev => ({ ...prev, direction, flightNumber: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  const estimatedTotal = selectedCar.baseRate + (formData.meetAndGreet ? 50 : 0);
  
  // Format date for display
  const formattedDate = formData.date 
    ? formData.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : 'Select a Date';

  return (
    <div className="bg-slate-50 min-h-screen pt-20 font-light selection:bg-yellow-600/30">
      
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Transfer Confirmed</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Thank you, {formData.name}. Your <span className="font-bold text-slate-900">{selectedCar.title}</span> has been reserved. Your chauffeur will track flight <span className="font-bold text-slate-900 uppercase">{formData.flightNumber}</span> and await you at the designated VIP meeting point.
              </p>
              <Link to="/" className="inline-block bg-slate-900 text-white font-bold px-8 py-4 rounded-full hover:bg-yellow-600 transition-colors">
                Return to Home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <div className="relative h-[65vh] flex items-center justify-center border-b border-gray-200">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Chauffeur" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center justify-center gap-2 drop-shadow-md">
            <Star className="w-4 h-4" /> Seamless Logistics
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg tracking-wide">
            Private Transfers
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Experience our signature meet-and-greet service. Allow our elite chauffeurs to ensure your journey begins and ends in absolute comfort.
          </motion.p>
        </div>
      </div>

      {/* 2. THE LUXE STANDARDS */}
      <div className="py-12 bg-white border-b border-gray-100 shadow-sm relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
          <div className="p-4"><Clock className="w-6 h-6 text-yellow-600 mx-auto mb-3" /><p className="font-bold text-sm text-slate-900 uppercase tracking-wider">Flight Tracking</p><p className="text-xs text-gray-500 mt-1">We adjust to delays automatically</p></div>
          <div className="p-4"><Shield className="w-6 h-6 text-yellow-600 mx-auto mb-3" /><p className="font-bold text-sm text-slate-900 uppercase tracking-wider">Elite Chauffeurs</p><p className="text-xs text-gray-500 mt-1">Vetted, trained & NDA secured</p></div>
          <div className="p-4"><Wifi className="w-6 h-6 text-yellow-600 mx-auto mb-3" /><p className="font-bold text-sm text-slate-900 uppercase tracking-wider">Onboard Wi-Fi</p><p className="text-xs text-gray-500 mt-1">Secure 5G connectivity</p></div>
          <div className="p-4"><MapPin className="w-6 h-6 text-yellow-600 mx-auto mb-3" /><p className="font-bold text-sm text-slate-900 uppercase tracking-wider">Meet & Greet</p><p className="text-xs text-gray-500 mt-1">White-glove baggage assistance</p></div>
        </div>
      </div>

      {/* 3. MAIN BOOKING ENGINE */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-24">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-16 items-start">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: THE INTERACTIVE FLEET         */}
          {/* ========================================== */}
          <div className="w-full xl:w-5/12 space-y-6 xl:sticky xl:top-24 z-0">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Curate Your Fleet</h2>
              <p className="text-gray-600">Select the perfect vehicle for your entourage. All vehicles are late-model, meticulously detailed, and fully sanitized before every journey.</p>
            </div>

            <div className="space-y-4">
              {fleet.map((vehicle) => {
                const isSelected = selectedCar.id === vehicle.id;
                return (
                  <motion.div 
                    layout
                    key={vehicle.id} 
                    onClick={() => setSelectedCar(vehicle)}
                    className={`flex flex-col cursor-pointer overflow-hidden transition-all duration-500 border rounded-2xl ${isSelected ? 'bg-slate-900 border-slate-900 shadow-2xl shadow-yellow-600/10' : 'bg-white border-gray-200 hover:border-yellow-600/50 hover:shadow-md'}`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 relative">
                        <img src={vehicle.image} alt={vehicle.title} className="w-full h-full object-cover" />
                        {isSelected && <div className="absolute inset-0 bg-yellow-600/20 mix-blend-overlay"></div>}
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-yellow-500' : 'text-yellow-600'}`}>{vehicle.category}</span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <h3 className={`font-bold text-lg leading-tight mb-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>{vehicle.title}</h3>
                        <div className="flex gap-4">
                          {vehicle.specs.map((spec, i) => (
                            <span key={i} className={`flex items-center gap-1.5 text-xs font-medium ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>
                              {spec.icon} {spec.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* EXPANDABLE INCLUSIONS TRAY FOR SELECTED CAR */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-slate-800 border-t border-slate-700 px-6 py-4"
                        >
                          <p className="text-sm text-gray-300 mb-4 leading-relaxed">{vehicle.description}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Complimentary Inclusions</p>
                          <div className="flex flex-wrap gap-2">
                            {vehicle.inclusions.map((inc, i) => (
                              <span key={i} className="flex items-center gap-1 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">
                                <Sparkles className="w-3 h-3" /> {inc}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: BOOKING ENGINE               */}
          {/* ========================================== */}
          <div className="w-full xl:w-7/12">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-gray-100 space-y-10 relative overflow-visible">
              
              {/* Decorative Background Blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

              {/* Transfer Direction Toggle */}
              <div className="bg-slate-100/50 p-2 rounded-2xl flex flex-col sm:flex-row gap-2 border border-gray-100">
                <button type="button" onClick={() => handleDirectionChange('arrival')} className={`flex-1 py-4 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${formData.direction === 'arrival' ? 'bg-slate-900 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200'}`}>
                  <PlaneLanding className="w-5 h-5" /> Airport to Resort
                </button>
                <button type="button" onClick={() => handleDirectionChange('departure')} className={`flex-1 py-4 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${formData.direction === 'departure' ? 'bg-slate-900 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200'}`}>
                  <PlaneTakeoff className="w-5 h-5" /> Resort to Airport
                </button>
              </div>

              {/* Logistics Grid */}
              <div className="space-y-6 relative">
                <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-gray-100 pb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 text-sm">1</span> 
                  Travel Logistics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  
                  {/* --- BESPOKE LIGHT MODE DATE PICKER --- */}
                  <div className="space-y-2 relative" ref={calendarRef}>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Date of Transfer</label>
                    <button 
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`w-full flex items-center justify-between bg-slate-50 border rounded-xl px-4 py-4 text-left transition-colors ${showCalendar ? 'border-yellow-500 text-slate-900 ring-2 ring-yellow-500/20 bg-white' : 'border-gray-200 text-slate-900 hover:bg-white'} ${!formData.date && 'text-gray-400'}`}
                    >
                      <span className="font-medium">{formattedDate}</span>
                      <CalendarDays className={`w-5 h-5 ${formData.date ? 'text-yellow-600' : 'text-gray-400'}`} />
                    </button>

                    <AnimatePresence>
                      {showCalendar && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[80px] left-0 w-full sm:w-[320px] bg-white border border-gray-100 rounded-2xl p-5 shadow-2xl z-50"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 rounded-full text-slate-600 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                            <h4 className="font-bold text-slate-900 text-lg font-serif">{MONTHS[currentMonth]} {currentYear}</h4>
                            <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-slate-50 rounded-full text-slate-600 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                          </div>

                          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                            {DAYS.map(day => (
                              <div key={day} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{day}</div>
                            ))}
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {renderCalendarDays()}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* --- END DATE PICKER --- */}

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{formData.direction === 'arrival' ? 'Flight Arrival Time' : 'Resort Pickup Time'}</label>
                    <input type="time" name="time" required value={formData.time} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all text-slate-900 font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex justify-between">
                    <span>Flight Number</span>
                    <span className="text-[10px] text-yellow-600 font-normal tracking-normal flex items-center gap-1"><Clock className="w-3 h-3"/> Active Tracking Enabled</span>
                  </label>
                  <input type="text" name="flightNumber" required placeholder="e.g. EK 202" value={formData.flightNumber} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all font-mono uppercase text-slate-900 text-lg tracking-wider" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Passengers</label>
                    <input type="number" name="passengers" min="1" max="8" required value={formData.passengers} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all text-slate-900 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Luggage Pieces</label>
                    <input type="number" name="luggage" min="0" max="12" required value={formData.luggage} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all text-slate-900 font-medium" />
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-6 relative z-0">
                <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-gray-100 pb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 text-sm">2</span> 
                  Guest Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" required placeholder="Lead Passenger Name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all text-slate-900 font-medium" />
                  <input type="tel" name="phone" required placeholder="Mobile Number (Active on travel day)" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all text-slate-900 font-medium" />
                </div>
                
                <input type="email" name="email" required placeholder="Email Address for Confirmation" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all text-slate-900 font-medium" />
                
                <textarea name="specialRequests" rows="2" placeholder="Child seat requirements, oversized baggage, or specific drinks..." value={formData.specialRequests} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all resize-none text-slate-900"></textarea>

                {/* Upsell/Extras Toggle */}
                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${formData.meetAndGreet ? 'bg-yellow-50 border-yellow-500' : 'bg-slate-50 border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <Coffee className={`w-5 h-5 ${formData.meetAndGreet ? 'text-yellow-600' : 'text-gray-400'}`} />
                    <div>
                      <p className={`font-bold text-sm ${formData.meetAndGreet ? 'text-slate-900' : 'text-gray-600'}`}>VIP Terminal Meet & Greet</p>
                      <p className="text-xs text-gray-500">Chauffeur waits inside terminal with iPad name board. (+$50)</p>
                    </div>
                  </div>
                  <input type="checkbox" name="meetAndGreet" className="w-5 h-5 accent-yellow-600 cursor-pointer" checked={formData.meetAndGreet} onChange={handleInputChange} />
                </label>
              </div>

              {/* DYNAMIC PRICING FOOTER & SUBMIT */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-0">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Estimated Total</p>
                  <p className="text-3xl font-bold text-slate-900">${estimatedTotal}</p>
                </div>

                <button type="submit" disabled={isSubmitting || !formData.date || !formData.flightNumber} className="w-full sm:w-auto px-10 bg-slate-900 text-white font-bold text-lg py-5 rounded-full hover:bg-yellow-600 transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Car className="w-5 h-5" /> Reserve Chauffeur</>}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default AirportTransfer;