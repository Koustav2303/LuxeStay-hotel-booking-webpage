import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Star, MapPin, Wifi, Coffee, Utensils, 
  Wind, Tv, Car, Dumbbell, ChevronDown, Heart, Share 
} from 'lucide-react';

const HotelDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data (In a real app, you fetch this based on ID)
  const hotel = {
    name: "The Royal Atlantis Resort",
    location: "Palm Jumeirah, Dubai, UAE",
    price: 850,
    rating: 4.9,
    reviews: 128,
    description: "Experience the ultimate in luxury living. This stunning resort offers breathtaking ocean views, world-class dining, and a private beach. Perfect for those seeking an exclusive getaway with impeccable service and attention to detail. The architecture itself is a marvel, designed to frame the Arabian Sea sunset perfectly from every suite.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      { icon: <Wifi />, name: "Fast Wifi" },
      { icon: <Coffee />, name: "Breakfast" },
      { icon: <Utensils />, name: "Restaurant" },
      { icon: <Wind />, name: "AC" },
      { icon: <Tv />, name: "Smart TV" },
      { icon: <Car />, name: "Free Parking" },
      { icon: <Dumbbell />, name: "Gym" },
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Navbar Overlay */}
      <nav className="fixed top-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
        <Link to="/" className="pointer-events-auto bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-105 transition-transform text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex gap-3 pointer-events-auto">
          <button className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-105 transition-transform text-slate-900">
            <Share className="w-5 h-5" />
          </button>
          <button className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-105 transition-transform text-red-500">
            <Heart className="w-5 h-5 fill-current" />
          </button>
        </div>
      </nav>

      {/* 2. Image Gallery (Bento Grid) */}
      <div className="h-[60vh] md:h-[75vh] grid grid-cols-4 grid-rows-2 gap-2 p-2 pt-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="col-span-4 md:col-span-2 row-span-2 rounded-2xl overflow-hidden relative group"
        >
          <img src={hotel.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </motion.div>
        <div className="hidden md:block col-span-1 row-span-1 rounded-2xl overflow-hidden">
          <img src={hotel.images[1]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 rounded-2xl overflow-hidden">
          <img src={hotel.images[2]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 rounded-2xl overflow-hidden">
          <img src={hotel.images[3]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 rounded-2xl overflow-hidden relative">
          <img src={hotel.images[4]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
          <button className="absolute bottom-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-gray-100">
            View All Photos
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* 3. Left Column: Details */}
        <div className="md:col-span-2">
          
          {/* Header Info */}
          <div className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-2 text-gray-500 text-sm md:text-base">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  {hotel.location}
                </div>
              </div>
            </div>
            
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-slate-900">{hotel.rating}</span>
                <span className="text-gray-500 text-xs">({hotel.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Superhost</span>
              </div>
            </div>
          </div>

          {/* Advanced Tabs System */}
          <div className="flex gap-8 border-b border-gray-100 mb-8 sticky top-0 bg-white z-40 py-4">
            {['overview', 'amenities', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${
                  activeTab === tab 
                  ? 'border-slate-900 text-slate-900' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-6 text-gray-600 leading-loose text-lg font-light">
                  <p>{hotel.description}</p>
                  <p>Guests can enjoy access to private pools, a state-of-the-art wellness center, and exclusive concierge services available 24/7. Whether you're here for business or leisure, The Royal Atlantis promises an unforgettable stay.</p>
                </div>
              )}
              
              {activeTab === 'amenities' && (
                <div className="grid grid-cols-2 gap-4">
                  {hotel.amenities.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-yellow-500 hover:bg-yellow-50 transition-all cursor-default">
                      <div className="text-slate-900">{item.icon}</div>
                      <span className="font-medium text-gray-700">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Rating Bars */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
                    <RatingBar label="Cleanliness" score="4.9" />
                    <RatingBar label="Accuracy" score="4.8" />
                    <RatingBar label="Communication" score="5.0" />
                    <RatingBar label="Location" score="4.9" />
                  </div>
                  {/* Fake Reviews */}
                  <ReviewCard name="Sarah J." date="Oct 2024" text="Absolutely stunning. The views are unmatched and the service was impeccable." />
                  <ReviewCard name="Michael B." date="Sep 2024" text="Worth every penny. The breakfast buffet is the best I have ever had." />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* 4. Right Column: Sticky Booking Card */}
        <div className="relative">
          <div className="sticky top-24 bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600" />
            
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-3xl font-bold text-slate-900">${hotel.price}</span>
                <span className="text-gray-500"> / night</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                <Star className="w-3 h-3 fill-slate-900 text-slate-900" /> 4.9
              </div>
            </div>

            {/* Date Inputs */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="p-3 border-r border-gray-200 hover:bg-gray-50 transition-colors">
                  <label className="text-[10px] font-bold text-slate-900 uppercase">Check-In</label>
                  <input type="text" placeholder="Add date" className="w-full outline-none text-sm bg-transparent" />
                </div>
                <div className="p-3 hover:bg-gray-50 transition-colors">
                  <label className="text-[10px] font-bold text-slate-900 uppercase">Check-Out</label>
                  <input type="text" placeholder="Add date" className="w-full outline-none text-sm bg-transparent" />
                </div>
              </div>
              <div className="p-3 hover:bg-gray-50 transition-colors">
                <label className="text-[10px] font-bold text-slate-900 uppercase">Guests</label>
                <div className="flex justify-between items-center">
                  <span className="text-sm">1 Guest</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-lg active:scale-95 mb-4 relative overflow-hidden group">
              <span className="relative z-10">Reserve Now</span>
              <div className="absolute inset-0 bg-yellow-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <div className="flex justify-between text-gray-500 text-sm mb-2">
              <span className="underline">Service fee</span>
              <span>$50</span>
            </div>
            <div className="flex justify-between text-slate-900 font-bold text-lg pt-4 border-t border-gray-100">
              <span>Total</span>
              <span>${hotel.price + 50}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Components for clean code
const RatingBar = ({ label, score }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-gray-600 text-sm w-32">{label}</span>
    <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-slate-900 rounded-full" style={{ width: `${(parseFloat(score)/5)*100}%` }} />
    </div>
    <span className="text-xs font-bold">{score}</span>
  </div>
);

const ReviewCard = ({ name, date, text }) => (
  <div className="border-b border-gray-100 pb-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
        {name[0]}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm">{name}</h4>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </div>
);

export default HotelDetails;