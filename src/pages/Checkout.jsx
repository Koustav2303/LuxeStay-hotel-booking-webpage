import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// FIXED: Added 'Star' to the import list below
import { 
  ArrowLeft, ShieldCheck, CreditCard, Calendar, User, 
  Mail, Phone, Lock, CheckCircle, Info, Star 
} from 'lucide-react';
import { allRooms } from '../data/roomsData';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Find the room
  const room = allRooms.find(r => r.id === parseInt(id));

  // --- STATES ---
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form Data (Pre-fill if user is logged in)
  const [formData, setFormData] = useState({
    firstName: user ? user.name.split(' ')[0] : '',
    lastName: user && user.name.split(' ').length > 1 ? user.name.split(' ')[1] : '',
    email: user ? user.email : '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  });

  // Mock Dates (In a real app, these would come from a date picker on the previous page)
  const [dates] = useState({
    checkIn: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 17)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    nights: 3
  });

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle Missing Room
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Room not found.</h1>
      </div>
    );
  }

  // --- CALCULATIONS ---
  const subtotal = room.price * dates.nights;
  const taxes = subtotal * 0.12; // 12% Luxury Tax
  const total = subtotal + taxes;

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Payment Processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Wait for success animation, then redirect to profile
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 pt-24">
      
      {/* 1. TOP NAVIGATION BAR */}
      <div className="container mx-auto px-6 max-w-6xl mb-8">
        <Link to={`/hotels/${room.id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-slate-900 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Room Details
        </Link>
      </div>

      <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* 2. LEFT COLUMN: FORMS */}
        <div className="lg:col-span-2 space-y-8">
          
          <h1 className="text-4xl font-serif font-bold text-slate-900">Secure Reservation</h1>
          
          <form onSubmit={handleCheckout} className="space-y-8">
            
            {/* GUEST INFORMATION SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-600" /> Guest Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">First Name</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Last Name</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all" placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT INFORMATION SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-yellow-600" /> Payment Method
                </h2>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-blue-800 border border-gray-200">VISA</div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-red-600 border border-gray-200">MC</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 mb-6 flex items-start gap-3 text-sm text-gray-600">
                <Lock className="w-5 h-5 text-green-600 shrink-0" />
                <p>Your payment information is encrypted and processed securely. We never store your full credit card details.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Name on Card</label>
                  <input type="text" name="nameOnCard" required value={formData.nameOnCard} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 transition-all" placeholder="JOHN DOE" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="cardNumber" required maxLength="19" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-yellow-600 transition-all font-mono" placeholder="0000 0000 0000 0000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Expiry Date</label>
                    <input type="text" name="expiry" required maxLength="5" value={formData.expiry} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 transition-all font-mono" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">CVC / CVV</label>
                    <div className="relative">
                      <input type="text" name="cvv" required maxLength="4" value={formData.cvv} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 transition-all font-mono" placeholder="123" />
                      <Info className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-bold text-lg py-5 rounded-xl hover:bg-yellow-600 hover:scale-[1.01] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                <>
                  <Lock className="w-5 h-5" /> Confirm & Pay ${total.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </>
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-green-600" /> 256-bit SSL Secure Checkout
            </p>
          </form>
        </div>

        {/* 3. RIGHT COLUMN: ORDER SUMMARY (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Booking Summary</h3>
            
            {/* Room Mini Card */}
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
              <img src={room.images[0]} alt={room.name} className="w-24 h-24 rounded-xl object-cover" />
              <div>
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">{room.type}</span>
                <h4 className="font-bold text-slate-900 leading-tight mt-1">{room.name}</h4>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" /> {room.rating} ({room.reviews})
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Check-in</p>
                  <p className="font-bold text-slate-900">{dates.checkIn}</p>
                </div>
                <div className="w-8 border-t-2 border-dashed border-gray-300"></div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold">Check-out</p>
                  <p className="font-bold text-slate-900">{dates.checkOut}</p>
                </div>
              </div>
              <p className="text-center text-sm font-medium text-yellow-700 mt-2 pt-2 border-t border-gray-200">
                {dates.nights} Nights Stay
              </p>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between">
                <span>${room.price} x {dates.nights} nights</span>
                <span className="font-medium text-slate-900">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Luxury Taxes & Fees (12%)</span>
                <span className="font-medium text-slate-900">${taxes.toLocaleString()}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-slate-900">Total</p>
                <p className="text-xs text-gray-500">Includes all taxes</p>
              </div>
              <p className="text-3xl font-bold text-slate-900">${total.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
          </div>
        </div>

      </div>

      {/* 4. SUCCESS OVERLAY (Animated) */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-4xl font-serif font-bold text-slate-900 mb-4 text-center"
            >
              Reservation Confirmed!
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-gray-500 text-lg text-center max-w-md mb-8"
            >
              Pack your bags, {formData.firstName}! We've sent the booking details to {formData.email}.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="flex items-center gap-2 text-yellow-600 font-bold"
            >
              <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
              Redirecting to your itinerary...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Checkout;