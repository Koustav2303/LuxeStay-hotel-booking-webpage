import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, Phone, Mail, CheckCircle, Heart, Star, ArrowRight, Camera, Music } from 'lucide-react';

// --- MOCK DATA ---

const venues = [
  {
    id: 1,
    title: "The Grand Astor Ballroom",
    category: "Weddings & Galas",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    description: "Our crown jewel. Featuring Austrian crystal chandeliers, hand-painted gold-leaf detailing, and floor-to-ceiling windows overlooking the ocean. The Grand Astor provides a majestic canvas for royal receptions and high-society galas.",
    specs: [
      { label: "Capacity", value: "Up to 500 Guests", icon: <Users className="w-4 h-4" /> },
      { label: "Dimensions", value: "12,000 sq ft", icon: <MapPin className="w-4 h-4" /> },
      { label: "Ideal For", value: "Grand Weddings", icon: <Heart className="w-4 h-4" /> }
    ]
  },
  {
    id: 2,
    title: "Oceanfront Vows",
    category: "Beach Ceremonies",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1974&auto=format&fit=crop",
    description: "Exchange your vows with the rhythm of the waves as your soundtrack. We reserve a pristine stretch of our private white-sand beach exclusively for your ceremony, offering the ultimate romantic sunset backdrop.",
    specs: [
      { label: "Capacity", value: "Up to 150 Guests", icon: <Users className="w-4 h-4" /> },
      { label: "Setting", value: "Private Beach", icon: <MapPin className="w-4 h-4" /> },
      { label: "Ideal For", value: "Sunset Ceremonies", icon: <Star className="w-4 h-4" /> }
    ]
  },
  {
    id: 3,
    title: "The Executive Summit",
    category: "Corporate Retreats",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1925&auto=format&fit=crop",
    description: "A state-of-the-art boardroom and networking lounge designed for global leaders. Equipped with the latest AV technology, ultra-fast secure Wi-Fi, and panoramic skyline views to inspire your team's next big breakthrough.",
    specs: [
      { label: "Capacity", value: "Up to 50 Executives", icon: <Users className="w-4 h-4" /> },
      { label: "Dimensions", value: "2,500 sq ft", icon: <MapPin className="w-4 h-4" /> },
      { label: "Ideal For", value: "Board Meetings", icon: <Star className="w-4 h-4" /> }
    ]
  }
];

const services = [
  {
    title: "Michelin-Star Catering",
    icon: <Star className="w-6 h-6 text-yellow-600" />,
    desc: "Bespoke tasting menus crafted by our Executive Chef, tailored to your dietary preferences and event theme."
  },
  {
    title: "Dedicated Planners",
    icon: <Heart className="w-6 h-6 text-yellow-600" />,
    desc: "From floral arrangements to seating charts, your personal event concierge handles every detail flawlessly."
  },
  {
    title: "Entertainment & AV",
    icon: <Music className="w-6 h-6 text-yellow-600" />,
    desc: "Access to world-class string quartets, live bands, and cinema-quality audio-visual equipment."
  },
  {
    title: "Photography Coordination",
    icon: <Camera className="w-6 h-6 text-yellow-600" />,
    desc: "Exclusive access to the resort's most stunning hidden locations for unforgettable wedding or team portraits."
  }
];

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FORM STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: 'Wedding', guests: '', date: '', details: ''
  });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', eventType: 'Wedding', guests: '', date: '', details: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-green-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 w-[90%] sm:w-auto justify-center font-bold">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> Inquiry sent! Our event team will contact you shortly.
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
            alt="Luxury Wedding Setup" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block drop-shadow-md">
            Unforgettable Moments
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Weddings & Events
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto">
            From intimate beachfront vows to grand corporate galas, our dedicated team turns your boldest visions into a flawless reality.
          </motion.p>
        </div>
      </div>

      {/* 2. EDITORIAL VENUE SHOWCASE (Z-Pattern) */}
      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-32">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Iconic Venues</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Discover the perfect canvas for your most important days.</p>
          </div>

          {venues.map((venue, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div key={venue.id} className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                <motion.div 
                  initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 relative group"
                >
                  <div className="relative h-[450px] md:h-[550px] w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img src={venue.image} alt={venue.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  <div className={`absolute -bottom-8 ${isImageLeft ? '-right-8' : '-left-8'} w-48 h-48 bg-yellow-600/10 rounded-full blur-3xl -z-10`}></div>
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
                      <Star className="w-4 h-4" /> {venue.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">{venue.title}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{venue.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-gray-200">
                    {venue.specs.map((spec, i) => (
                      <div key={i}>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          {spec.icon} {spec.label}
                        </p>
                        <p className="font-bold text-slate-900">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-yellow-600 transition-colors group mt-2">
                    View Floorplan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BESPOKE SERVICES GRID */}
      <div className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-slate-900">Flawless Execution</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">Comprehensive event services to ensure perfection at every touchpoint.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 border border-gray-100 p-8 rounded-3xl hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. EVENT INQUIRY FORM */}
      <div className="py-24 bg-slate-900 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-5/12 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Start Planning</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
                Connect with our expert event directors. Share a few details about your upcoming gathering, and we will craft a bespoke proposal tailored to your exact needs.
              </p>
              
              <div className="space-y-6 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5"><Phone className="w-5 h-5 text-yellow-500" /></div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Call our Planners</p>
                    <p className="text-lg font-bold">+971 4 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5"><Mail className="w-5 h-5 text-yellow-500" /></div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Email Us</p>
                    <p className="text-lg font-bold">events@luxestay.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-7/12 w-full">
              <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl text-slate-900 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Event Type</label>
                    <select name="eventType" value={formData.eventType} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all appearance-none cursor-pointer">
                      <option value="Wedding">Wedding / Reception</option>
                      <option value="Corporate">Corporate Retreat</option>
                      <option value="Social">Social Gala</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Estimated Guests</label>
                    <input type="number" name="guests" required value={formData.guests} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all" placeholder="150" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all text-slate-700" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Additional Details</label>
                  <textarea name="details" rows="3" value={formData.details} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-600 focus:bg-white transition-all resize-none" placeholder="Tell us about your vision..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-yellow-600 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4">
                  {isSubmitting ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Request Proposal'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Events;