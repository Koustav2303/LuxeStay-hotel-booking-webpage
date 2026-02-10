import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Star, MapPin, Wifi, Coffee, Utensils, 
  Wind, Tv, Car, Dumbbell, ChevronDown, Heart, Share, Maximize 
} from 'lucide-react';
import { allRooms } from '../data/roomsData'; // 1. Import Data

const HotelDetails = () => {
  const { id } = useParams(); // 2. Get ID from URL
  const [activeTab, setActiveTab] = useState('overview');
  
  // 3. Find the specific room
  const room = allRooms.find(r => r.id === parseInt(id));

  // 4. Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 5. Handle "Room Not Found"
  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-3xl font-bold mb-4">Room not found</h2>
        <Link to="/rooms" className="text-yellow-600 underline">Back to Rooms</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Navbar Overlay */}
      <nav className="fixed top-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
        <Link to="/rooms" className="pointer-events-auto bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-105 transition-transform text-slate-900">
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

      {/* Dynamic Image Gallery */}
      <div className="h-[60vh] md:h-[75vh] grid grid-cols-4 grid-rows-2 gap-2 p-2 pt-0 bg-slate-100">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="col-span-4 md:col-span-2 row-span-2 rounded-2xl overflow-hidden relative group"
        >
          <img src={room.images[0]} alt="Main" className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Side Images */}
        {room.images.slice(1, 5).map((img, index) => (
          <div key={index} className={`hidden md:block col-span-1 row-span-1 rounded-2xl overflow-hidden ${index === 3 ? 'relative' : ''}`}>
             <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
             {index === 3 && (
               <button className="absolute bottom-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-gray-100">
                 View All Photos
               </button>
             )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left Column: Details */}
        <div className="md:col-span-2">
          
          <div className="mb-8 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-2">{room.name}</h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm md:text-base mb-4">
              <MapPin className="w-4 h-4 text-yellow-500" />
              {room.location}
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-slate-900">{room.rating}</span>
                <span className="text-gray-500 text-xs">({room.reviews} reviews)</span>
              </div>
              <div className="px-3 py-1 rounded-lg border border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center">
                {room.type}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 text-gray-600 leading-loose text-lg font-light mb-12">
            <p>{room.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-400 uppercase font-bold">Room Size</p>
                    <p className="font-bold text-slate-900">{room.size}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-400 uppercase font-bold">Occupancy</p>
                    <p className="font-bold text-slate-900">{room.occupancy}</p>
                </div>
            </div>
          </div>

          {/* Amenities */}
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {room.amenities.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="relative">
          <div className="sticky top-24 bg-white border border-gray-200 shadow-2xl rounded-2xl p-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-3xl font-bold text-slate-900">${room.price}</span>
                <span className="text-gray-500"> / night</span>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-yellow-600 transition-all shadow-lg mb-4">
              Reserve Now
            </button>
            <p className="text-center text-xs text-gray-400">You won't be charged yet</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelDetails;