import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Wine, Clock, MapPin, ArrowRight, ChefHat, Star, Coffee, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---

const restaurants = [
  {
    id: 1,
    name: "The Zenith",
    cuisine: "Modern Michelin-Star Fine Dining",
    chef: "Executive Chef Laurent Dubois",
    dressCode: "Formal / Evening Wear",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    description: "Suspended on the 54th floor, The Zenith offers a transcendent culinary journey. Chef Laurent crafts an ever-evolving 9-course tasting menu that marries traditional French techniques with avant-garde molecular gastronomy, all while you look out over the glittering city skyline.",
    hours: "Dinner: 18:00 - 23:00 (Reservations Required)",
    location: "Rooftop, 54th Floor"
  },
  {
    id: 2,
    name: "Ocean's Edge",
    cuisine: "Mediterranean Seafood & Grill",
    chef: "Head Chef Marco Rossi",
    dressCode: "Smart Casual",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
    description: "Dine directly on the pristine sands of our private beach. Ocean's Edge specializes in the day's freshest catch, grilled to perfection over open wood fires. Enjoy hand-crafted coastal cocktails as the sun dips below the horizon in an atmosphere of relaxed luxury.",
    hours: "Lunch: 12:00 - 15:00 | Dinner: 18:00 - 22:30",
    location: "Private Beachfront Cabanas"
  },
  {
    id: 3,
    name: "The Amber Lounge",
    cuisine: "Rare Spirits & Tapas",
    chef: "Master Mixologist Elena Vance",
    dressCode: "Cocktail Attire",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
    description: "Step into an era of classic glamour. The Amber Lounge features live jazz, a curated humidor, and one of the world's most extensive collections of rare whiskeys and vintage champagnes. Pair your libations with our exquisite artisanal tapas.",
    hours: "16:00 - 02:00 Daily",
    location: "Lobby Level, West Wing"
  }
];

const experiences = [
  {
    title: "The Sommelier's Cellar",
    icon: <Wine className="w-6 h-6 text-yellow-600" />,
    desc: "A private guided tasting through our subterranean wine cellar featuring vintages from 1920 to present."
  },
  {
    title: "Chef's Table Masterclass",
    icon: <ChefHat className="w-6 h-6 text-yellow-600" />,
    desc: "Join our Executive Chef in the kitchen for a hands-on culinary masterclass followed by a private lunch."
  },
  {
    title: "24/7 In-Suite Dining",
    icon: <Coffee className="w-6 h-6 text-yellow-600" />,
    desc: "Experience our world-class menu from the comfort and absolute privacy of your own luxury suite."
  }
];

const Dining = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" 
            alt="Fine Dining Plating" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </motion.div>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            Taste The Extraordinary
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Culinary Excellence
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto">
            Embark on a gastronomic journey across our award-winning restaurants and lounges, where every bite is a masterpiece.
          </motion.p>
        </div>
      </div>

      {/* 2. PHILOSOPHY SECTION */}
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">Our Philosophy</h2>
          <p className="text-gray-600 text-lg leading-relaxed font-light">
            At LuxeStay, we believe dining is more than sustenance; it is theater, art, and memory-making. We source only the rarest organic ingredients, partnering with local artisans and sustainable fisheries to bring the absolute best of the region to your plate.
          </p>
        </div>
      </div>

      {/* 3. EDITORIAL RESTAURANT SHOWCASE (Z-Pattern) */}
      <div className="py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-24 md:space-y-32">
          {restaurants.map((rest, index) => {
            // Determine if the image should be on the left or right based on odd/even index
            const isImageLeft = index % 2 === 0;

            return (
              <div key={rest.id} className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 relative group"
                >
                  <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                    <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  {/* Decorative element */}
                  <div className={`absolute -bottom-6 ${isImageLeft ? '-right-6' : '-left-6'} w-32 h-32 bg-yellow-600/10 rounded-full blur-2xl -z-10`}></div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div>
                    <span className="text-yellow-600 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Utensils className="w-4 h-4" /> {rest.cuisine}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">{rest.name}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{rest.description}</p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-gray-200">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><ChefHat className="w-3 h-3" /> Led By</p>
                      <p className="font-bold text-slate-900">{rest.chef}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Info className="w-3 h-3" /> Dress Code</p>
                      <p className="font-bold text-slate-900">{rest.dressCode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Hours</p>
                      <p className="font-bold text-slate-900">{rest.hours}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</p>
                      <p className="font-bold text-slate-900">{rest.location}</p>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-yellow-600 transition-colors group mt-2">
                    View Full Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. EXCLUSIVE CULINARY EXPERIENCES */}
      <div className="py-24 bg-slate-900 text-white mt-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Private Experiences</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">Go beyond the menu with our curated private dining events.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20">
                  {exp.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{exp.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. FINAL CALL TO ACTION */}
      <div className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Reserve Your Table</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Our most sought-after venues book up weeks in advance. Secure your culinary experience today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-yellow-600 transition-colors shadow-xl">
              Book a Reservation
            </button>
            <button className="bg-gray-100 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors">
              Contact Concierge
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dining;