import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  User, Shield, CreditCard, Settings, LogOut, MapPin, Calendar, 
  CheckCircle, Camera, X, AlertTriangle, Wifi, Plus, Trash2, Edit, ChevronRight, Globe
} from 'lucide-react';

const Profile = () => {
  const { user, logout, bookings, deleteBooking } = useAuth();
  const navigate = useNavigate();
  
  const fileInputRef = useRef(null);
  const carouselRef = useRef(null); 
  
  // --- STATES ---
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Successfully updated!');

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || 'Koustav Pan');
  const [profileImage, setProfileImage] = useState(null);

  // --- CARDS STATES ---
  const [savedCards, setSavedCards] = useState([
    { id: 1, type: 'VISA', number: '•••• •••• •••• 4242', name: displayName, expiry: '12/28', theme: 'from-[#0f172a] via-[#1e293b] to-[#0f172a]' },
    { id: 2, type: 'MASTERCARD', number: '•••• •••• •••• 5555', name: displayName, expiry: '08/26', theme: 'from-[#1f2937] via-[#374151] to-[#111827]' },
    { id: 3, type: 'AMEX', number: '•••• •••• •••• 8888', name: displayName, expiry: '02/25', theme: 'from-[#1e3a8a] via-[#1e40af] to-[#172554]' },
  ]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [newCardData, setNewCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    if (!user) navigate('/login');
    window.scrollTo(0, 0);
  }, [user, navigate]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 20) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' }); 
        }
      }
    }, 3500); 
    return () => clearInterval(slideInterval);
  }, [savedCards.length]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const triggerSuccess = (message = 'Successfully updated!') => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      triggerSuccess();
    }, 1500);
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAddNewCard = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      const last4 = newCardData.number.slice(-4) || '0000';
      const isVisa = newCardData.number.startsWith('4');
      const newCard = {
        id: Date.now(),
        type: isVisa ? 'VISA' : 'MASTERCARD',
        number: `•••• •••• •••• ${last4}`,
        name: newCardData.name.toUpperCase() || displayName.toUpperCase(),
        expiry: newCardData.expiry || '12/29',
        theme: isVisa ? 'from-[#0f172a] via-[#1e293b] to-[#0f172a]' : 'from-[#1f2937] via-[#374151] to-[#111827]'
      };
      setSavedCards([newCard, ...savedCards]);
      setNewCardData({ number: '', name: '', expiry: '', cvv: '' });
      setIsAddingCard(false);
      setIsSaving(false);
      triggerSuccess('New card added successfully!');
    }, 1500);
  };

  const confirmDeleteCard = () => {
    setSavedCards(savedCards.filter(card => card.id !== cardToDelete));
    setCardToDelete(null);
    triggerSuccess('Card removed securely.');
  };

  const confirmDeleteBooking = () => {
    deleteBooking(bookingToDelete);
    setBookingToDelete(null);
    triggerSuccess('Trip history removed.');
  };

  return (
    // FIX 1: overflow-x-hidden instead of overflow-hidden prevents sideways drifting
    <div className="bg-slate-50 min-h-screen pt-24 pb-32 relative overflow-x-hidden">
      
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-green-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 w-[90%] sm:w-auto justify-center">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* HEADER SECTION */}
        <div className="bg-white rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 mb-8 border border-gray-100 shadow-sm relative text-center md:text-left">
          <div 
            className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-4xl font-serif font-bold shrink-0 overflow-hidden ${
              profileImage ? 'bg-transparent' : 'bg-slate-900 text-yellow-500 shadow-lg'
            } ${isEditing ? 'cursor-pointer hover:ring-4 ring-yellow-500' : ''}`}
            onClick={() => isEditing && fileInputRef.current.click()}
          >
            {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : displayName.charAt(0)}
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                <Camera className="w-6 h-6 md:w-8 md:h-8 mb-1" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Change</span>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={(e) => { if (e.target.files[0]) setProfileImage(URL.createObjectURL(e.target.files[0])) }} accept="image/*" className="hidden" />
          </div>

          <div className="flex-1 min-w-0 w-full">
            {isEditing ? (
              <div className="max-w-xs mx-auto md:mx-0 mb-2">
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full text-2xl font-serif font-bold text-slate-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-yellow-600 text-center md:text-left" autoFocus />
              </div>
            ) : (
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2 truncate">{displayName}</h1>
            )}
            {/* FIX 2: Added break-all for extremely long email addresses on mobile */}
            <p className="text-gray-500 text-sm md:text-base break-all sm:break-normal">
              {user.email} <span className="hidden sm:inline">•</span> <br className="sm:hidden" /> Member since {user.memberSince}
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0 justify-center">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="bg-gray-100 px-4 py-2 rounded-lg font-bold text-sm">Cancel</button>
                <button onClick={() => { setIsEditing(false); triggerSuccess('Profile updated successfully!'); }} className="bg-yellow-600 text-slate-900 px-6 py-2 rounded-lg font-bold text-sm shadow-lg">Save</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-slate-100 hover:bg-slate-200 px-6 py-2 md:py-3 rounded-lg font-bold text-sm flex items-center gap-2"><Edit className="w-4 h-4" /> Edit Profile</button>
            )}
          </div>
        </div>

        {/* SIDEBAR & MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:w-64 shrink-0 w-full lg:sticky lg:top-28 z-40">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 md:p-4 flex lg:flex-col overflow-x-auto gap-2 [&::-webkit-scrollbar]:hidden">
              {[
                { id: 'dashboard', label: 'My Dashboard', icon: <User className="w-5 h-5" /> },
                { id: 'payments', label: 'Payment & Cards', icon: <CreditCard className="w-5 h-5" /> },
                { id: 'security', label: 'Login & Security', icon: <Shield className="w-5 h-5" /> },
                { id: 'preferences', label: 'Preferences', icon: <Settings className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap shrink-0 ${
                    activeSection === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
              <div className="hidden lg:block h-px bg-gray-100 my-4"></div>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-600 hover:bg-red-50 shrink-0 lg:shrink">
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full space-y-12">
            
            {/* 1. DASHBOARD SECTION */}
            <section id="dashboard" className="space-y-8 scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900">My Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-32 h-32 bg-yellow-600/20 rounded-full blur-3xl"></div>
                  <p className="text-gray-400 text-sm mb-1">Member Status</p>
                  <h3 className="text-2xl font-serif font-bold text-yellow-500 mb-4">{user.tier || 'Platinum Member'}</h3>
                  <p className="text-sm font-light">12 Nights until Diamond</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
                  <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
                  <h3 className="text-3xl font-bold text-slate-900">{bookings?.length || 0}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
                  <p className="text-gray-400 text-sm mb-1">LuxePoints Balance</p>
                  <h3 className="text-3xl font-bold text-slate-900">12,500</h3>
                </div>
              </div>

              {/* BOOKINGS LIST */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">My Trips</h3>
                </div>
                
                {bookings && bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="relative border-b border-gray-100 last:border-0 bg-white hover:bg-gray-50 transition-colors group">
                      <Link 
                        to={`/booking/${booking.id}`} 
                        className="p-6 pr-16 md:pr-20 flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full"
                      >
                        <img 
                          src={booking.image} 
                          className={`w-full sm:w-24 h-48 sm:h-24 rounded-xl object-cover shrink-0 ${booking.status === 'Completed' ? 'grayscale opacity-80 group-hover:grayscale-0 transition-all' : ''}`} 
                          alt="Thumbnail" 
                        />
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${booking.statusColor}`}>
                            {booking.status}
                          </span>
                          <h4 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-yellow-600 transition-colors truncate">{booking.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 truncate">{booking.location.split(',')[0]} • {booking.dateStart}</p>
                        </div>
                      </Link>

                      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center">
                        {booking.status === 'Completed' ? (
                          <button
                            onClick={(e) => { e.preventDefault(); setBookingToDelete(booking.id); }}
                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all z-10"
                            title="Remove from history"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        ) : (
                          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-slate-900 transition-colors hidden sm:block pointer-events-none" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>You have no upcoming or past trips yet.</p>
                    <Link to="/rooms" className="text-yellow-600 font-bold hover:underline mt-2 inline-block">Explore our rooms</Link>
                  </div>
                )}
              </div>
            </section>

            {/* 2. PAYMENTS SECTION */}
            <section id="payments" className="space-y-8 scroll-mt-28 w-full min-w-0">
              <div className="bg-white py-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm w-full overflow-hidden">
                <div className="flex justify-between items-center mb-6 px-6 md:px-0 border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Payment & Cards</h3>
                  <button onClick={() => setIsAddingCard(true)} className="flex items-center gap-2 text-sm font-bold text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg hover:bg-yellow-100 shrink-0">
                    <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Card</span>
                  </button>
                </div>
                
                <div ref={carouselRef} className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 pt-2 px-6 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scroll-smooth">
                  <AnimatePresence>
                    {savedCards.map((card) => (
                      <motion.div 
                        key={card.id}
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                        // FIX 3: ADDED `overflow-hidden` so the glow effect doesn't break out
                        // Changed width to a fixed mobile width (w-[280px]) so it doesn't cause math bugs with padding
                        className={`shrink-0 w-[280px] sm:w-[340px] aspect-[1.586/1] rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden shadow-2xl bg-gradient-to-br ${card.theme} snap-center border border-white/10 flex flex-col h-full`}
                      >
                        <div className="absolute inset-0 bg-white/5 opacity-30 pointer-events-none mix-blend-overlay"></div>
                        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex justify-between items-start z-10 w-full">
                          <span className="text-xl sm:text-2xl font-bold italic tracking-widest drop-shadow-md opacity-90">{card.type}</span>
                          <button onClick={() => setCardToDelete(card.id)} className="text-white/40 hover:text-white bg-black/10 hover:bg-red-500/80 p-2 rounded-full backdrop-blur-sm transition-all -mt-1 -mr-1">
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex items-center gap-3 z-10 mb-3 sm:mb-4">
                          <div className="w-10 h-8 sm:w-12 sm:h-9 bg-gradient-to-br from-[#e5c158] to-[#c59327] rounded-md flex items-center justify-center overflow-hidden border border-[#a37920] shadow-inner relative">
                            <div className="w-full h-[1px] bg-[#a37920]/60 absolute"></div>
                            <div className="w-[1px] h-full bg-[#a37920]/60 absolute"></div>
                            <div className="w-5 h-4 sm:w-6 sm:h-5 border border-[#a37920]/60 rounded-sm"></div>
                          </div>
                          <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 rotate-90" />
                        </div>
                        <div className="z-10 w-full">
                          <p className="font-mono text-lg sm:text-xl tracking-[0.1em] sm:tracking-[0.15em] mb-3 sm:mb-4 drop-shadow-md">{card.number}</p>
                          <div className="flex justify-between items-end w-full gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-white/60 text-[8px] sm:text-[10px] uppercase tracking-widest mb-0.5">Cardholder Name</p>
                              <p className="font-semibold text-xs sm:text-sm tracking-widest uppercase truncate">{card.name}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="text-white/60 text-[8px] sm:text-[10px] uppercase tracking-widest mb-0.5">Valid Thru</p>
                              <p className="font-semibold text-xs sm:text-sm tracking-widest">{card.expiry}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* 3. SECURITY SECTION */}
            <section id="security" className="space-y-8 scroll-mt-28">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-gray-100 pb-4">Login & Security</h3>
                <form onSubmit={handleSave} className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Current Password</label>
                    <input type="password" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">New Password</label>
                    <input type="password" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600" />
                  </div>
                  <button type="submit" disabled={isSaving} className="w-full sm:w-auto bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-yellow-600">
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </section>

            {/* 4. PREFERENCES SECTION */}
            <section id="preferences" className="space-y-8 scroll-mt-28">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-gray-100 pb-4">Global Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Globe className="w-4 h-4" /> Default Language</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 appearance-none">
                      <option>English (US)</option>
                      <option>French (FR)</option>
                    </select>
                  </div>
                </div>
                <button onClick={handleSave} className="w-full sm:w-auto mt-8 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-yellow-600">
                  Save Preferences
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Add Card Modal */}
      <AnimatePresence>
        {isAddingCard && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Add New Card</h3>
                <button onClick={() => setIsAddingCard(false)} className="text-gray-400 hover:text-slate-900"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddNewCard} className="space-y-5">
                <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Card Number</label><input type="text" required maxLength="19" placeholder="0000 0000 0000 0000" value={newCardData.number} onChange={(e) => setNewCardData({...newCardData, number: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono" /></div>
                <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Name on Card</label><input type="text" required placeholder="JOHN DOE" value={newCardData.name} onChange={(e) => setNewCardData({...newCardData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 uppercase" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Expiry</label><input type="text" required maxLength="5" placeholder="MM/YY" value={newCardData.expiry} onChange={(e) => setNewCardData({...newCardData, expiry: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono" /></div>
                  <div className="space-y-2"><label className="text-sm font-bold text-slate-700">CVV</label><input type="text" required maxLength="4" placeholder="123" value={newCardData.cvv} onChange={(e) => setNewCardData({...newCardData, cvv: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono" /></div>
                </div>
                <button type="submit" disabled={isSaving} className="w-full mt-4 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-yellow-600 transition-colors">Save Card Securely</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Delete Card Confirmation Modal */}
      <AnimatePresence>
        {cardToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600"><AlertTriangle className="w-8 h-8" /></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Remove Card?</h3>
              <p className="text-gray-500 mb-8">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setCardToDelete(null)} className="flex-1 bg-gray-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-gray-200">Cancel</button>
                <button onClick={confirmDeleteCard} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700">Yes, Remove</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Delete Booking Confirmation Modal */}
      <AnimatePresence>
        {bookingToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600"><AlertTriangle className="w-8 h-8" /></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Remove History?</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to remove this completed trip from your dashboard?</p>
              <div className="flex gap-3">
                <button onClick={() => setBookingToDelete(null)} className="flex-1 bg-gray-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-gray-200">Cancel</button>
                <button onClick={confirmDeleteBooking} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700">Yes, Remove</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Profile;