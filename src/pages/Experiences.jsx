import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, MapPin, X, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// IMPORT THE CENTRALIZED DATA (Notice there is NO .js at the end of this line!)
import { categories, allExperiences as experiences } from '../data/experiencesData';

const Experiences = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredExperiences = activeCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      
      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 max-w-7xl mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6">Curated Experiences</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          Elevate your stay with our hand-picked selection of extraordinary local adventures, fine dining, and wellness retreats.
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="container mx-auto px-6 max-w-7xl mb-12 flex justify-center flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
              activeCategory === category.id 
                ? 'bg-slate-900 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* EXPERIENCES GRID */}
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredExperiences.map((exp) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={exp.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
                onClick={() => setSelectedExperience(exp)}
              >
                {/* Image Container */}
                <div className="h-72 relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-900">
                    {categories.find(c => c.id === exp.category)?.label}
                  </div>
                  
                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-xl text-white font-bold shadow-lg">
                    ${exp.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">{exp.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-4">
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-yellow-500" /> {exp.duration}</div>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /> {exp.rating}</div>
                  </div>

                  <p className="text-gray-500 line-clamp-2 leading-relaxed font-light mb-6">
                    {exp.description}
                  </p>

                  <div className="flex items-center text-yellow-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
                    Explore Details <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {selectedExperience && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:h-auto md:max-h-[90vh] bg-white z-50 overflow-y-auto md:rounded-3xl shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur p-2 rounded-full text-slate-900 shadow-lg hover:scale-110 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Image */}
              <div className="h-64 md:h-80 w-full relative">
                <img src={selectedExperience.image} alt={selectedExperience.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-yellow-500 text-slate-900 text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-3">
                    {categories.find(c => c.id === selectedExperience.category)?.label}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">{selectedExperience.title}</h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    <Clock className="w-6 h-6 text-yellow-600 mb-2" />
                    <span className="text-xs text-gray-400 font-bold uppercase">Duration</span>
                    <span className="font-bold text-slate-900">{selectedExperience.duration}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    <Star className="w-6 h-6 text-yellow-600 mb-2 fill-current" />
                    <span className="text-xs text-gray-400 font-bold uppercase">Rating</span>
                    <span className="font-bold text-slate-900">{selectedExperience.rating}/5.0</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    <Users className="w-6 h-6 text-yellow-600 mb-2" />
                    <span className="text-xs text-gray-400 font-bold uppercase">Group Size</span>
                    <span className="font-bold text-slate-900">Private</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    <MapPin className="w-6 h-6 text-yellow-600 mb-2" />
                    <span className="text-xs text-gray-400 font-bold uppercase">Location</span>
                    <span className="font-bold text-slate-900">On-site</span>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">About this experience</h3>
                  <p className="text-gray-600 leading-relaxed font-light text-lg">
                    {selectedExperience.description}
                  </p>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Itinerary</h3>
                  <div className="space-y-6">
                    {selectedExperience.itinerary.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full ring-4 ring-yellow-50" />
                          {index !== selectedExperience.itinerary.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-2" />
                          )}
                        </div>
                        <div className="pb-2">
                          <p className="font-bold text-slate-900">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CHECKOUT LINK */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-bold">Total Price</span>
                    <span className="text-3xl font-bold text-slate-900">${selectedExperience.price}</span>
                    <span className="text-gray-400 text-sm"> / person</span>
                  </div>
                  
                  <Link 
                    to={`/experience-checkout/${selectedExperience.id}`}
                    className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-600 hover:scale-[1.02] transition-all shadow-xl"
                  >
                    Book Experience
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Experiences;