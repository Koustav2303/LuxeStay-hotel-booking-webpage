import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Droplets, Flower2, Wind, Clock, ArrowRight, Heart, Sun, Activity, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---

const treatments = [
  {
    id: 1,
    title: "The Celestial Journey",
    category: "Signature Body Therapy",
    duration: "120 Minutes",
    price: "$350",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
    description: "Our ultimate signature experience. This head-to-toe ritual begins with a full-body exfoliation using crushed pearls and sea salt, followed by a warm basalt stone massage to melt away deep-seated tension. Concludes with a restorative scalp massage using wild-harvested argan oil.",
    benefits: ["Relieves Muscle Tension", "Improves Circulation", "Deeply Hydrating"],
    icon: <Droplets className="w-5 h-5 text-yellow-600" />
  },
  {
    id: 2,
    title: "Luminous 24K Gold Facial",
    category: "Advanced Skincare",
    duration: "90 Minutes",
    price: "$420",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
    description: "A decadent, age-defying treatment fit for royalty. We use pure 24-karat gold leaf, known for its powerful anti-inflammatory and cellular regeneration properties. Combined with micro-current lifting technology and a botanical collagen mask, your skin is left visibly sculpted and glowing.",
    benefits: ["Cellular Regeneration", "Instant Lifting Effect", "Radiant Complexion"],
    icon: <Flower2 className="w-5 h-5 text-yellow-600" />
  },
  {
    id: 3,
    title: "Deep Ocean Detox Wrap",
    category: "Purification Ritual",
    duration: "75 Minutes",
    price: "$280",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    description: "Harness the purifying power of the sea. After a dry brush lymphatic stimulation, your body is cocooned in a warm, mineral-rich marine algae wrap. As the marine actives draw out toxins, you will receive a deeply relaxing reflexology foot massage.",
    benefits: ["Detoxifies the Body", "Stimulates Lymphatic System", "Mineral Replenishment"],
    icon: <Wind className="w-5 h-5 text-yellow-600" />
  }
];

const wellnessPrograms = [
  {
    title: "Couples' Zen Retreat",
    icon: <Heart className="w-6 h-6 text-yellow-600" />,
    desc: "Share a moment of pure connection in our private VIP suite. Includes a dual aromatherapy massage, private hydrotherapy bath, and champagne."
  },
  {
    title: "Mindfulness & Meditation",
    icon: <Sun className="w-6 h-6 text-yellow-600" />,
    desc: "Guided morning meditation and breathwork sessions held in our tranquil outdoor Zen garden, designed to center the mind and spirit."
  },
  {
    title: "Ayurvedic Healing",
    icon: <Activity className="w-6 h-6 text-yellow-600" />,
    desc: "Ancient Indian holistic therapies, including Shirodhara (warm oil poured over the third eye) to balance your doshas and nervous system."
  }
];

const Spa = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Spa Wellness" 
            className="w-full h-full object-cover" 
          />
          {/* Softer, more ethereal gradient for the spa */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-50 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </motion.div>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block drop-shadow-md">
            Sanctuary of Peace
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Spa & Wellness
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md">
            Leave the world behind. Immerse yourself in holistic therapies that harmonize your mind, body, and spirit in an atmosphere of absolute tranquility.
          </motion.p>
        </div>
      </div>

      {/* 2. FACILITIES OVERVIEW */}
      <div className="bg-white py-12 border-b border-gray-100 relative -mt-16 z-20 mx-4 md:mx-auto max-w-6xl rounded-3xl shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
          <div className="px-4">
            <h4 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">12</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Treatment Suites</p>
          </div>
          <div className="px-4">
            <h4 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">4</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Thermal Pools</p>
          </div>
          <div className="px-4">
            <h4 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">2</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Aroma Saunas</p>
          </div>
          <div className="px-4">
            <h4 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">1</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Ice Fountain</p>
          </div>
        </div>
      </div>

      {/* 3. PHILOSOPHY SECTION */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Our Healing Philosophy</h2>
          <p className="text-gray-600 text-lg leading-relaxed font-light">
            True wellness is a delicate balance. Our expert therapists utilize a blend of ancient healing traditions and cutting-edge dermatological science. Every treatment is completely bespoke, tailored to your unique physical needs and energetic state at the moment of your arrival.
          </p>
        </div>
      </div>

      {/* 4. EDITORIAL TREATMENTS SHOWCASE (Z-Pattern) */}
      <div className="py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-24 md:space-y-32">
          {treatments.map((treatment, index) => {
            // Determine if the image should be on the left or right based on odd/even index
            const isImageLeft = index % 2 === 0;

            return (
              <div key={treatment.id} className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 relative group"
                >
                  {/* Taller, elegant aspect ratio for Spa images */}
                  <div className="relative h-[450px] md:h-[600px] w-full rounded-full overflow-hidden shadow-2xl">
                    <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  {/* Soft decorative blur */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isImageLeft ? '-right-10' : '-left-10'} w-48 h-48 bg-teal-600/10 rounded-full blur-3xl -z-10`}></div>
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
                    <span className="text-yellow-600 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                      {treatment.icon} {treatment.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">{treatment.title}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{treatment.description}</p>
                  </div>

                  {/* Benefits List */}
                  <div className="mb-8">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Key Benefits</p>
                    <ul className="space-y-2">
                      {treatment.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metadata Grid */}
                  <div className="flex items-center gap-8 py-6 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Duration</p>
                      <p className="font-bold text-slate-900 text-xl">{treatment.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pricing</p>
                      <p className="font-bold text-slate-900 text-xl">{treatment.price}</p>
                    </div>
                  </div>

                  {/* LINK UPDATED HERE */}
                  <Link to="/spa/reserve" className="inline-flex items-center gap-2 bg-slate-100 px-6 py-3 rounded-xl text-slate-900 font-bold hover:bg-yellow-600 hover:text-white transition-colors group mt-2">
                    Request Booking <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 5. WELLNESS PROGRAMS */}
      <div className="py-24 bg-white mt-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-slate-900">Holistic Retreats</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">Comprehensive wellness programs designed for deep restoration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wellnessPrograms.map((prog, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 border border-gray-100 p-8 rounded-3xl hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {prog.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">{prog.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{prog.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. FINAL CALL TO ACTION */}
      <div className="py-24 bg-slate-900 text-center relative overflow-hidden">
        {/* Soft abstract shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-600/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Begin Your Journey</h2>
          <p className="text-gray-400 mb-10 text-lg font-light">
            Our Spa Concierge is available to help you design the perfect day of relaxation. Advance reservations are highly recommended.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* LINK UPDATED HERE */}
            <Link to="/spa/reserve" className="bg-yellow-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-xl inline-block">
              Book a Treatment
            </Link>
            <button className="bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
              Contact Concierge
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Spa;