import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Filter, ChevronDown, Search, MapPin, Star, 
  Wifi, Coffee, Wind, Tv, Check 
} from 'lucide-react';

// --- MOCK DATA ---
const allRooms = [
  {
    id: 1,
    name: "Royal Ocean Suite",
    type: "Suite",
    price: 850,
    rating: 4.9,
    amenities: ["Ocean View", "Wifi", "Breakfast", "Bathtub"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    location: "Dubai, UAE"
  },
  {
    id: 2,
    name: "Panorama Villa",
    type: "Villa",
    price: 1200,
    rating: 5.0,
    amenities: ["Private Pool", "Wifi", "Kitchen", "Gym Access"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    location: "Lake Como, Italy"
  },
  {
    id: 3,
    name: "Garden Deluxe Room",
    type: "Standard",
    price: 450,
    rating: 4.7,
    amenities: ["Wifi", "Smart TV", "Mini Bar"],
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2030&auto=format&fit=crop",
    location: "Bali, Indonesia"
  },
  {
    id: 4,
    name: "Skyline Penthouse",
    type: "Suite",
    price: 2500,
    rating: 5.0,
    amenities: ["City View", "Wifi", "Butler Service", "Jacuzzi"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    location: "New York, USA"
  },
  {
    id: 5,
    name: "Mountain Retreat",
    type: "Cabin",
    price: 600,
    rating: 4.8,
    amenities: ["Fireplace", "Hiking", "Wifi"],
    image: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=2065&auto=format&fit=crop",
    location: "Swiss Alps"
  },
  {
    id: 6,
    name: "Lagoon Bungalow",
    type: "Villa",
    price: 1500,
    rating: 4.9,
    amenities: ["Water Access", "Wifi", "Breakfast", "Spa"],
    image: "https://images.unsplash.com/photo-1738762827470-6caf6caee4b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFnb29uJTIwYnVuZ2xvd3xlbnwwfHwwfHx8MA%3D%3D",
    location: "Maldives"
  }
];

const Rooms = () => {
  // --- STATE ---
  const [filteredRooms, setFilteredRooms] = useState(allRooms);
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState(3000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  
  // --- FILTER LOGIC ---
  useEffect(() => {
    let result = allRooms;

    // Filter by Type
    if (selectedType !== 'All') {
      result = result.filter(room => room.type === selectedType);
    }

    // Filter by Price
    result = result.filter(room => room.price <= priceRange);

    // Filter by Amenities
    if (selectedAmenities.length > 0) {
      result = result.filter(room => 
        selectedAmenities.every(amenity => room.amenities.includes(amenity))
      );
    }

    setFilteredRooms(result);
  }, [selectedType, priceRange, selectedAmenities]);

  // Toggle Amenity Helper
  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* 1. HEADER SECTION */}
      <div className="relative h-[50vh] bg-slate-900 overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-4"
          >
            Luxury Collection
          </motion.h1>
          <p className="text-xl font-light text-gray-200">Find your perfect sanctuary.</p>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* --- SIDEBAR FILTERS --- */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Filter className="w-5 h-5 text-yellow-600" />
                <h3 className="text-xl font-bold text-slate-900">Filters</h3>
              </div>

              {/* Price Filter */}
              <div>
                <label className="text-sm font-bold text-slate-900 mb-4 block">Max Price: ${priceRange}</label>
                <input 
                  type="range" 
                  min="200" max="3000" step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$200</span>
                  <span>$3000+</span>
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="text-sm font-bold text-slate-900 mb-3 block">Room Type</label>
                <div className="space-y-2">
                  {['All', 'Suite', 'Villa', 'Standard', 'Cabin'].map(type => (
                    <div 
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedType === type 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div>
                <label className="text-sm font-bold text-slate-900 mb-3 block">Amenities</label>
                <div className="space-y-3">
                  {['Wifi', 'Ocean View', 'Private Pool', 'Breakfast', 'Spa'].map(amenity => (
                    <div 
                      key={amenity} 
                      onClick={() => toggleAmenity(amenity)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        selectedAmenities.includes(amenity)
                          ? 'bg-yellow-500 border-yellow-500 text-white'
                          : 'border-gray-300 group-hover:border-yellow-500'
                      }`}>
                        {selectedAmenities.includes(amenity) && <Check className="w-3 h-3" />}
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-slate-900">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* --- ROOMS GRID --- */}
          <div className="lg:col-span-3">
            
            {/* Mobile Filter Toggle (Visible only on mobile) */}
            <div className="lg:hidden mb-6">
              <button className="w-full bg-white border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-slate-900 shadow-sm">
                <Filter className="w-4 h-4" /> Show Filters
              </button>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {filteredRooms.length} <span className="text-gray-400 font-normal text-lg">Stays Found</span>
              </h2>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 cursor-pointer hover:text-slate-900">
                Sort by: Recommended <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence>
                {filteredRooms.map(room => (
                  <motion.div
                    layout
                    key={room.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group"
                  >
                    <Link to={`/hotels/${room.id}`}>
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={room.image} 
                          alt={room.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {room.rating}
                        </div>
                        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                          {room.type}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">
                              {room.name}
                            </h3>
                            <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" /> {room.location}
                            </p>
                          </div>
                        </div>

                        {/* Amenities Tags */}
                        <div className="flex flex-wrap gap-2 my-4">
                          {room.amenities.slice(0, 3).map((am, i) => (
                            <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
                              {am}
                            </span>
                          ))}
                          {room.amenities.length > 3 && (
                            <span className="text-xs text-gray-400 py-1">+ {room.amenities.length - 3} more</span>
                          )}
                        </div>

                        {/* Price & Button */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <div>
                            <span className="text-2xl font-bold text-slate-900">${room.price}</span>
                            <span className="text-gray-400 text-sm"> / night</span>
                          </div>
                          <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-yellow-500 hover:text-slate-900 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredRooms.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No rooms found</h3>
                <p className="text-gray-500">Try adjusting your price range or filters.</p>
                <button 
                  onClick={() => {setPriceRange(3000); setSelectedType('All'); setSelectedAmenities([]);}}
                  className="mt-4 text-yellow-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;