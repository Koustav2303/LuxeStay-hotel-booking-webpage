import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, Clock, Sparkles, ArrowRight, Gift, Calendar as CalendarIcon } from 'lucide-react';
import { offersData } from '../data/offersData'; // Import the data!

const Offers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-24">
      
      {/* HEADER SECTION */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" /> Curated Packages
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Exclusive Offers
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Elevate your stay with our thoughtfully designed packages. From romantic escapes to culinary journeys, discover the perfect way to experience LuxeStay.
          </motion.p>
        </div>
      </div>

      {/* OFFERS GRID */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {offersData.map((offer, index) => (
            <motion.div 
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-yellow-500 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg">
                    <Tag className="w-3.5 h-3.5" /> {offer.badge}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-1 block">{offer.category}</span>
                  <h3 className="text-2xl font-serif font-bold">{offer.title}</h3>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                  {offer.description}
                </p>

                {/* Offer Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-slate-50 rounded-2xl border border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Gift className="w-3.5 h-3.5" /> Package Value</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">${offer.offerPrice}</span>
                      <span className="text-sm text-gray-400 line-through">${offer.originalPrice}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Valid Until</p>
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-yellow-600" /> {offer.validUntil}
                    </p>
                  </div>
                </div>

                {/* DYNAMIC CALL TO ACTION */}
                <Link to={`/offers/${offer.id}`} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-600 hover:text-slate-900 transition-colors group/btn">
                  View Offer Details <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Offers;