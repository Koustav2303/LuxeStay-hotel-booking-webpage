import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Coffee, Palmtree, Music, Utensils, 
  Clock, Users, MapPin, X, ArrowRight, Star, Calendar 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const categories = [
  { id: 'all', label: 'All Experiences', icon: <Compass /> },
  { id: 'dining', label: 'Fine Dining', icon: <Utensils /> },
  { id: 'wellness', label: 'Wellness & Spa', icon: <Palmtree /> },
  { id: 'adventure', label: 'Adventure', icon: <MapPin /> },
  { id: 'events', label: 'Events & Nightlife', icon: <Music /> },
];

const experiences = [
  {
    id: 1,
    title: "Sunset Yacht Cruise",
    category: "adventure",
    price: 350,
    duration: "4 Hours",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    description: "Sail across the Arabian Gulf on a private 50ft yacht. Enjoy champagne, canapés, and a front-row seat to the most spectacular sunset in Dubai.",
    itinerary: ["5:00 PM - Boarding & Welcome Drinks", "6:00 PM - Sunset Views", "7:00 PM - Gourmet Dinner on Deck", "9:00 PM - Return to Harbor"]
  },
  {
    id: 2,
    title: "Michelin Star Chef's Table",
    category: "dining",
    price: 280,
    duration: "3 Hours",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    description: "An exclusive 7-course tasting menu prepared right in front of you by our celebrity chef. Each course is paired with rare vintage wines.",
    itinerary: ["Welcome Aperitif", "Kitchen Tour", "7-Course Tasting", "Meet the Chef"]
  },
  {
    id: 3,
    title: "Golden Hour Yoga",
    category: "wellness",
    price: 80,
    duration: "90 Mins",
    rating: 4.8,
    image: "https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Restore your balance with a guided yoga session on our private beach deck as the sun rises. Includes a healthy detox breakfast post-session.",
    itinerary: ["6:00 AM - Session Start", "7:30 AM - Meditation", "8:00 AM - Detox Breakfast"]
  },
  {
    id: 4,
    title: "Desert Safari & Stargazing",
    category: "adventure",
    price: 150,
    duration: "6 Hours",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2070&auto=format&fit=crop",
    description: "Venture into the dunes in a vintage Land Rover. Enjoy a traditional Bedouin dinner under the stars with a professional astronomer guide.",
    itinerary: ["3:00 PM - Pickup", "4:30 PM - Dune Bashing", "6:00 PM - Camel Ride", "8:00 PM - Dinner & Astronomy"]
  },
  {
    id: 5,
    title: "Jazz Night at The Vault",
    category: "events",
    price: 120,
    duration: "Late Night",
    rating: 4.9,
    image: "https://plus.unsplash.com/premium_photo-1683298921068-87903c9ad47a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amF6eiUyMG5pZ2h0fGVufDB8fDB8fHww",
    description: "Experience the city's best live jazz in our speakeasy bar. Entry includes two signature cocktails and a selection of gourmet tapas.",
    itinerary: ["9:00 PM - Doors Open", "10:00 PM - Live Band Starts", "12:00 AM - DJ Set"]
  },
  {
    id: 6,
    title: "Helicopter City Tour",
    category: "adventure",
    price: 450,
    duration: "25 Mins",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1563561686990-f0ef5b3e0b7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVsaWNvcHRlcnxlbnwwfHwwfHx8MA%3D%3D",
    description: "See the skyline from a new perspective. A thrilling helicopter ride over the Palm Jumeirah, Burj Khalifa, and the World Islands.",
    itinerary: ["Pre-flight Briefing", "25 Min Flight", "Photo Opportunity", "Return Transfer"]
  }
];

const Experiences = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState(null);

  const filteredExperiences = selectedCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-20">
      
      {/* 1. CINEMATIC HERO */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681997951882-6e5fe4182e1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjBleHBlcmllbmNlc3xlbnwwfHwwfHx8MA%3D%3D')" }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.span 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Curated Moments
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif font-bold mb-6 drop-shadow-2xl"
          >
            Unforgettable <br/> <span className="italic text-yellow-500">Memories</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed"
          >
            From private dining on the beach to sunset yacht cruises, discover experiences designed to take your breath away.
          </motion.p>
        </div>
      </div>

      {/* 2. STICKY CATEGORY NAV */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 md:justify-center min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat.id 
                    ? 'bg-slate-900 text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat.icon && React.cloneElement(cat.icon, { className: "w-4 h-4" })}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. EXPERIENCES GRID */}
      <div className="container mx-auto px-6 py-16">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredExperiences.map((exp) => (
              <motion.div
                layout
                key={exp.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedExperience(exp)}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 uppercase tracking-wider">
                    {categories.find(c => c.id === exp.category)?.icon}
                    {exp.category}
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-2xl font-serif font-bold">{exp.title}</h3>
                      <div className="flex items-center gap-1 bg-yellow-500/90 px-2 py-1 rounded-lg text-xs font-bold text-slate-900">
                        <Star className="w-3 h-3 fill-current" /> {exp.rating}
                      </div>
                    </div>
                    <p className="text-gray-200 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {exp.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-yellow-400" /> {exp.duration}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4 text-yellow-400" /> From ${exp.price}</span>
                      </div>
                      <span className="bg-white text-slate-900 p-2 rounded-full hover:bg-yellow-400 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 4. DETAIL MODAL (Overlay) */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 z-20 bg-white/50 hover:bg-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-900" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Image */}
                <div className="h-64 md:h-auto relative">
                  <img src={selectedExperience.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                    <h2 className="text-3xl font-serif font-bold text-white">{selectedExperience.title}</h2>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="p-8 md:p-12 bg-white">
                  <h2 className="hidden md:block text-4xl font-serif font-bold text-slate-900 mb-4">
                    {selectedExperience.title}
                  </h2>
                  
                  <div className="flex gap-4 mb-8 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><Clock className="w-4 h-4" /> {selectedExperience.duration}</span>
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><Users className="w-4 h-4" /> Group or Private</span>
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><Star className="w-4 h-4 text-yellow-500" /> {selectedExperience.rating}</span>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    {selectedExperience.description}
                  </p>

                  <h3 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">What to expect</h3>
                  <div className="space-y-4 mb-8 relative">
                    <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-100" />
                    {selectedExperience.itinerary?.map((step, i) => (
                      <div key={i} className="flex gap-4 relative">
                        <div className="w-4 h-4 rounded-full bg-yellow-500 shrink-0 mt-1 ring-4 ring-white" />
                        <p className="text-gray-600 text-sm">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      <span className="block text-xs text-gray-400 uppercase font-bold">Total Price</span>
                      <span className="text-3xl font-bold text-slate-900">${selectedExperience.price}</span>
                      <span className="text-gray-400 text-sm"> / person</span>
                    </div>
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-slate-900 transition-colors shadow-xl">
                      Book Experience
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Experiences;