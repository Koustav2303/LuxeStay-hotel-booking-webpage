import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Star, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const hotels = [
  {
    id: 1,
    name: "The Royal Atlantis",
    location: "Dubai, UAE",
    price: "$850",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Grand Hotel Tremezzo",
    location: "Lake Como, Italy",
    price: "$1,200",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Four Seasons Bora Bora",
    location: "Bora Bora, French Polynesia",
    price: "$1,500",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2030&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Amangiri Resort",
    location: "Utah, USA",
    price: "$2,100",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
  }
];

const Featured = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-yellow-500 font-bold tracking-wider uppercase text-sm">Handpicked Collections</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3 leading-tight">
              Trending Destinations <br/> for 2024
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-3 px-6 py-3 border border-slate-200 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all group">
            View All Stays <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
          {hotels.map((hotel, index) => (
            <Link key={hotel.id} to={`/hotels/${hotel.id}`} className="min-w-[85vw] md:min-w-[400px] snap-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                {/* Image Card */}
                <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
                  <div className="absolute top-4 right-4 z-10">
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                  {/* Floating Content inside Image */}
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-1 text-yellow-400 mb-2">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold">{hotel.rating}</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-300 flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4" /> {hotel.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs uppercase font-bold mb-1">Starting from</p>
                        <p className="text-white font-bold text-xl">{hotel.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Featured;