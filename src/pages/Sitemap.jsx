import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Compass, Home, Search, User, Bed, Sparkles, Gift, 
  Utensils, Droplets, Plane, PartyPopper, Car, 
  ShieldCheck, Scale, Phone, ArrowRight, Map
} from 'lucide-react';

const Sitemap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sitemapSections = [
    {
      category: "Core Navigation",
      icon: <Compass className="w-5 h-5 text-yellow-600" />,
      links: [
        { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
        { name: "Global Search", path: "/search", icon: <Search className="w-4 h-4" /> },
        { name: "Member Dashboard", path: "/profile", icon: <User className="w-4 h-4" /> }
      ]
    },
    {
      category: "Stays & Experiences",
      icon: <Bed className="w-5 h-5 text-yellow-600" />,
      links: [
        { name: "Rooms & Suites", path: "/rooms", icon: <Bed className="w-4 h-4" /> },
        { name: "Curated Experiences", path: "/experiences", icon: <Sparkles className="w-4 h-4" /> },
        { name: "Exclusive Offers", path: "/offers", icon: <Gift className="w-4 h-4" /> }
      ]
    },
    {
      category: "Luxury Services",
      icon: <Sparkles className="w-5 h-5 text-yellow-600" />,
      links: [
        { name: "Fine Dining", path: "/dining", icon: <Utensils className="w-4 h-4" /> },
        { name: "Spa & Wellness", path: "/spa", icon: <Droplets className="w-4 h-4" /> },
        { name: "Yachts & Aviation", path: "/charters", icon: <Plane className="w-4 h-4" /> },
        { name: "Weddings & Galas", path: "/events", icon: <PartyPopper className="w-4 h-4" /> },
        { name: "Airport Transfers", path: "/transfer", icon: <Car className="w-4 h-4" /> }
      ]
    },
    {
      category: "Legal & Support",
      icon: <ShieldCheck className="w-5 h-5 text-yellow-600" />,
      links: [
        { name: "Privacy Policy", path: "/privacy", icon: <ShieldCheck className="w-4 h-4" /> },
        { name: "Terms of Service", path: "/terms", icon: <Scale className="w-4 h-4" /> },
        { name: "Contact Concierge", path: "/", icon: <Phone className="w-4 h-4" /> } // Directs to home or a dedicated contact modal
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-24 selection:bg-yellow-600/30">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 border border-gray-100">
            <Map className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Directory & Sitemap</h1>
          <p className="text-gray-500 font-light leading-relaxed">
            Navigate the complete LuxeStay digital ecosystem. Find everything from our ultra-luxury accommodations and bespoke services to our legal policies.
          </p>
        </motion.div>

        {/* SITEMAP GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {sitemapSections.map((section, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-gray-100 h-full"
            >
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-xl font-serif font-bold text-slate-900">{section.category}</h2>
              </div>
              
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="flex items-center justify-between group py-2"
                    >
                      <div className="flex items-center gap-3 text-gray-500 group-hover:text-slate-900 transition-colors">
                        <span className="text-gray-300 group-hover:text-yellow-600 transition-colors">
                          {link.icon}
                        </span>
                        <span className="font-medium text-sm">{link.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-yellow-600 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM HELP BOX */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Can't find what you're looking for?</h3>
            <p className="text-gray-400 font-light mb-8">
              Our digital concierge team is available 24/7 to assist you with navigation, booking inquiries, or bespoke arrangements.
            </p>
            <Link to="/search" className="inline-flex items-center justify-center bg-yellow-600 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-600/20">
              Start a New Search
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Sitemap;