import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Clock, Star, MapPin, CheckCircle, Info, GlassWater, ChefHat } from 'lucide-react';
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

const DiningReservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- COMPLEX FORM STATE ---
  const [formData, setFormData] = useState({
    venueId: 'zenith',
    date: '',
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

  // Derived state for the sticky sidebar
  const selectedVenue = venues.find(v => v.id === formData.venueId);

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
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

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
                Thank you, {formData.name}. Your table for {formData.guests} at <span className="text-white font-bold">{selectedVenue.name}</span> on <span className="text-white font-bold">{formData.date || 'your selected date'}</span> at <span className="text-white font-bold">{formData.time}</span> has been secured. A confirmation email has been sent.
              </p>
              <Link to="/dining" className="inline-block bg-yellow-600 text-slate-950 font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors">
                Return to Dining
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP NAV BAR */}
      <div className="pt-10 pb-6 px-6 container mx-auto max-w-7xl">
        <Link to="/dining" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-400 transition-colors text-sm font-bold uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Venues
        </Link>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: STICKY VENUE PREVIEW          */}
          {/* ========================================== */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8 space-y-6 hidden md:block">
            <h1 className="text-4xl font-serif font-bold text-white mb-8">Secure Your Experience</h1>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedVenue.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl"
              >
                <div className="h-64 w-full relative">
                  <img src={selectedVenue.image} alt={selectedVenue.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
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
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">1</span> 
                  Select Venue
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {venues.map(venue => (
                    <div 
                      key={venue.id}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, venueId: venue.id, time: '' })); // Reset time on venue change
                      }}
                      className={`cursor-pointer border rounded-2xl p-4 transition-all duration-300 ${formData.venueId === venue.id ? 'bg-yellow-600/10 border-yellow-500 text-white' : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-600'}`}
                    >
                      <h4 className={`font-bold mb-1 ${formData.venueId === venue.id ? 'text-yellow-500' : 'text-white'}`}>{venue.name}</h4>
                      <p className="text-xs line-clamp-2">{venue.cuisine}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: Party Size & Date */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-yellow-500 text-sm">2</span> 
                  Date & Party
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Reservation Date
                    </label>
                    <input 
                      type="date" 
                      name="date" 
                      required 
                      value={formData.date} 
                      onChange={handleInputChange} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors color-scheme-dark" 
                    />
                  </div>
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
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl">
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
                        className={`py-3 rounded-xl border text-sm font-bold transition-all ${formData.time === time ? 'bg-yellow-600 text-slate-950 border-yellow-600 shadow-lg shadow-yellow-600/20' : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-600'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-900/50 text-gray-500">
                    <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <p>Please select a date first to view available times.</p>
                  </div>
                )}
              </div>

              {/* SECTION 4: Guest Details & Upgrades */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-xl space-y-8">
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
      
      {/* CSS to ensure dark mode calendar picker on Chrome/Safari */}
      <style jsx="true">{`
        .color-scheme-dark {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
};

export default DiningReservation;