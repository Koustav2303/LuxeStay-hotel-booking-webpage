import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
// Using ONLY 100% safe, universally supported core icons
import { Plane, Anchor, Users, Navigation, Compass, MapPin, ArrowRight, Shield, Wind, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---

const fleet = [
  {
    id: 1,
    title: "Gulfstream G650ER",
    type: "Private Aviation",
    tagline: "Uncompromising Speed and Range",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop",
    description: "The crown jewel of our aviation fleet. The G650ER offers an ultra-long-range flight experience in a whisper-quiet, pressurized cabin. Featuring hand-stitched leather seating, a private stateroom, and a dedicated culinary team, you can fly non-stop from New York to Dubai in absolute luxury.",
    specs: [
      { label: "Capacity", value: "14 Passengers", icon: <Users className="w-4 h-4" /> },
      { label: "Cruising Speed", value: "Mach 0.90", icon: <Compass className="w-4 h-4" /> },
      { label: "Max Range", value: "7,500 nm", icon: <MapPin className="w-4 h-4" /> },
      { label: "Crew", value: "2 Pilots, 2 Cabin", icon: <Shield className="w-4 h-4" /> }
    ],
    icon: <Plane className="w-5 h-5 text-yellow-600" />
  },
  {
    id: 2,
    title: "Azimut Grande 27M",
    type: "Luxury Yacht",
    tagline: "The Ocean is Your Playground",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2074&auto=format&fit=crop",
    description: "Discover hidden coves and exclusive coastal retreats aboard our 88-foot motor yacht. Featuring an expansive flybridge, a bow lounging area, and bespoke interior styling by Achille Salvagni. Your private chef and dedicated crew will ensure every moment at sea is flawless.",
    specs: [
      { label: "Guests", value: "10 (Overnight)", icon: <Users className="w-4 h-4" /> },
      { label: "Cruising Speed", value: "24 Knots", icon: <Wind className="w-4 h-4" /> },
      { label: "Charter Type", value: "Day / Weekly", icon: <Clock className="w-4 h-4" /> },
      { label: "Crew", value: "Captain + 3 Crew", icon: <Shield className="w-4 h-4" /> }
    ],
    icon: <Anchor className="w-5 h-5 text-yellow-600" />
  },
  {
    id: 3,
    title: "AgustaWestland AW139",
    type: "VIP Helicopter",
    tagline: "Arrive Instantly, in Style",
    image: "https://studentpilotcommunity.com/wp-content/uploads/2024/10/vip-and-executive-transport-in-helicopters-irc.jpg",
    description: "Bypass ground traffic completely. Our twin-engine VIP helicopter offers swift, scenic transfers directly from the international airport to the resort's private helipad. The expansive, noise-canceling cabin ensures you can conduct business or simply relax as you descend from the clouds.",
    specs: [
      { label: "Capacity", value: "6 Passengers", icon: <Users className="w-4 h-4" /> },
      { label: "Cruising Speed", value: "165 Knots", icon: <Compass className="w-4 h-4" /> },
      { label: "Service", value: "Airport / Scenic", icon: <Navigation className="w-4 h-4" /> },
      { label: "Crew", value: "2 VIP Pilots", icon: <Shield className="w-4 h-4" /> }
    ],
    icon: <Navigation className="w-5 h-5 text-yellow-600" />
  }
];

const Charters = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[75vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.stockcake.com/public/8/a/1/8a17d3dc-84b8-4706-bef6-2e4088627c53_large/luxurious-yacht-twilight-stockcake.jpg" 
            alt="Luxury Yacht aerial" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block drop-shadow-md">
            The Ultimate Freedom
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Yachts & Aviation
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Arrive effortlessly and explore limitlessly. Our exclusive, fully-crewed fleet of private jets, helicopters, and motor yachts operates entirely on your schedule.
          </motion.p>
        </div>
      </div>

      {/* 2. PHILOSOPHY / TRUST METRICS */}
      <div className="py-16 bg-slate-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="py-4 md:py-0 px-4">
              <Shield className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-slate-900 mb-2">Absolute Discretion</h4>
              <p className="text-sm text-gray-500">Private terminals, secure boarding, and strict non-disclosure agreements for all our VIP guests.</p>
            </div>
            <div className="py-4 md:py-0 px-4">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-slate-900 mb-2">On-Demand Readiness</h4>
              <p className="text-sm text-gray-500">Wheels up or lines cast off with as little as 4 hours of advance notice globally.</p>
            </div>
            <div className="py-4 md:py-0 px-4">
              <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-slate-900 mb-2">Global Reach</h4>
              <p className="text-sm text-gray-500">Direct access to over 5,000 private airports and the world's most exclusive superyacht marinas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EDITORIAL FLEET SHOWCASE (Z-Pattern) */}
      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-32">
          {fleet.map((vehicle, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div key={vehicle.id} className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 relative group"
                >
                  <div className="relative h-[400px] md:h-[550px] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                    <img src={vehicle.image} alt={vehicle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none"></div>
                  </div>
                  <div className={`absolute -bottom-10 ${isImageLeft ? '-right-10' : '-left-10'} w-64 h-64 bg-slate-900/5 rounded-full blur-3xl -z-10`}></div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div>
                    <span className="text-yellow-600 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                      {vehicle.icon} {vehicle.type}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-2">{vehicle.title}</h2>
                    <p className="text-xl text-gray-400 font-serif italic mb-6">{vehicle.tagline}</p>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{vehicle.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    {vehicle.specs.map((spec, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          {spec.icon} {spec.label}
                        </span>
                        <span className="font-bold text-slate-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* LINK INSTEAD OF BUTTON */}
                  <Link to="/charters/inquire" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-600 transition-colors shadow-lg group">
                    Inquire Availability <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CLEAN CALL TO ACTION (Replaces the Form) */}
      <div className="py-24 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Coordinate Your Logistics</h2>
          <p className="text-gray-400 mb-10 text-lg font-light">
            Our Director of Aviation and Marine Logistics is standing by to prepare a comprehensive proposal for your next journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* LINK INSTEAD OF BUTTON */}
            <Link to="/charters/inquire" className="bg-yellow-600 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-xl inline-block">
              Request Charter Manifest
            </Link>
            <button className="bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
              Call Marine Desk
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Charters;