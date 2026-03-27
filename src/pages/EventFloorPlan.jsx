import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, LayoutGrid, Users, Maximize, Ruler, Download, ArrowRight, Component, MonitorPlay, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK VENUE & LAYOUT DATA ---
const venues = [
  {
    id: "grand-astor",
    name: "The Grand Astor Ballroom",
    area: "12,000 sq ft",
    ceiling: "24 ft",
    description: "Our flagship venue featuring Austrian crystal chandeliers and floor-to-ceiling ocean views.",
    capacities: { banquet: 500, theater: 800, ushape: 120, reception: 1000 }
  },
  {
    id: "executive-summit",
    name: "The Executive Summit",
    area: "2,500 sq ft",
    ceiling: "14 ft",
    description: "State-of-the-art boardroom and networking lounge designed for global leaders.",
    capacities: { banquet: 80, theater: 150, ushape: 50, reception: 200 }
  },
  {
    id: "oceanfront",
    name: "Oceanfront Terrace",
    area: "8,000 sq ft",
    ceiling: "Open Air",
    description: "A pristine stretch of our private beach terrace for spectacular sunset events.",
    capacities: { banquet: 300, theater: 450, ushape: 80, reception: 600 }
  }
];

const layouts = [
  { id: 'banquet', name: 'Banquet / Gala', icon: <Users className="w-5 h-5" /> },
  { id: 'theater', name: 'Theater / Keynote', icon: <MonitorPlay className="w-5 h-5" /> },
  { id: 'ushape', name: 'U-Shape / Boardroom', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'reception', name: 'Cocktail Reception', icon: <Component className="w-5 h-5" /> }
];

const EventFloorplan = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeVenue, setActiveVenue] = useState(venues[0].id);
  const [activeLayout, setActiveLayout] = useState(layouts[0].id);
  const [isDownloading, setIsDownloading] = useState(false);

  const venueData = venues.find(v => v.id === activeVenue);
  const currentCapacity = venueData.capacities[activeLayout];

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  // --- DYNAMIC SCHEMATIC RENDERER ---
  const renderSchematic = () => {
    const elements = [];
    
    if (activeLayout === 'banquet') {
      for(let i=0; i<12; i++) {
        elements.push(
          <motion.div key={`banquet-${i}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }} className="w-12 h-12 rounded-full border-2 border-yellow-600/50 bg-yellow-600/10 flex items-center justify-center m-4">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </motion.div>
        );
      }
    } else if (activeLayout === 'theater') {
      elements.push(<motion.div key="stage" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full h-12 bg-slate-800 rounded-lg mb-8 flex items-center justify-center text-xs text-slate-500 font-bold tracking-widest uppercase border border-slate-700">Stage / Screen</motion.div>);
      const rows = 5;
      const chairsPerRow = 10;
      for(let r=0; r<rows; r++) {
        const rowDivs = [];
        for(let c=0; c<chairsPerRow; c++) {
          rowDivs.push(<motion.div key={`chair-${r}-${c}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (r * 0.1) + (c * 0.02) }} className="w-4 h-4 bg-slate-700 rounded-sm m-1"></motion.div>);
        }
        elements.push(<div key={`row-${r}`} className="flex justify-center w-full">{rowDivs}</div>);
      }
    } else if (activeLayout === 'ushape') {
      elements.push(
        <motion.div key="ushape-container" className="relative w-64 h-64 mx-auto mt-8 border-t-[16px] border-l-[16px] border-r-[16px] border-yellow-600/30 rounded-t-2xl flex justify-between px-2 pt-2">
           <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 text-[10px] text-yellow-600 uppercase font-bold tracking-widest">Presenter</div>
           <div className="flex flex-col gap-4 mt-4 -ml-6">{[1,2,3,4].map(i => <div key={`l-${i}`} className="w-3 h-3 bg-slate-600 rounded-full"></div>)}</div>
           <div className="flex flex-col gap-4 mt-4 -mr-6">{[1,2,3,4].map(i => <div key={`r-${i}`} className="w-3 h-3 bg-slate-600 rounded-full"></div>)}</div>
        </motion.div>
      );
    } else if (activeLayout === 'reception') {
      elements.push(<motion.div key="dancefloor" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute center inset-0 m-auto w-40 h-40 border border-dashed border-slate-600 bg-slate-900/50 flex items-center justify-center text-xs text-slate-500 tracking-widest uppercase">Dance Floor</motion.div>);
      for(let i=0; i<16; i++) {
        const top = Math.random() * 80 + 10 + '%';
        const left = Math.random() * 80 + 10 + '%';
        elements.push(
          <motion.div key={`cocktail-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="absolute w-4 h-4 rounded-full bg-yellow-500/50 border border-yellow-500" style={{ top, left }}></motion.div>
        );
      }
    }

    return (
      <div className="relative w-full h-[400px] border-2 border-slate-800 bg-slate-950 rounded-2xl p-8 flex flex-wrap justify-center items-center overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
        {elements}
      </div>
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-light selection:bg-yellow-600/30 pb-24">
      
      {/* TOP NAV BAR */}
      <div className="pt-28 pb-6 px-6 container mx-auto max-w-7xl border-b border-white/5">
        <Link to="/events" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-400 transition-colors text-sm font-bold uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Events
        </Link>
        <div className="mt-8">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-yellow-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" /> Interactive Architect
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Floorplan & Capacity
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Visualize your perfect event. Select a venue and layout to instantly view spatial requirements and dynamic guest capacities.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: CONTROLS & METRICS            */}
          {/* ========================================== */}
          <div className="w-full lg:w-1/3 space-y-10">
            
            {/* Venue Selector */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b border-slate-800 pb-2">1. Select Venue</h3>
              <div className="flex flex-col gap-3">
                {venues.map(venue => (
                  <button
                    key={venue.id}
                    onClick={() => setActiveVenue(venue.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${activeVenue === venue.id ? 'bg-yellow-600/10 border-yellow-500 shadow-lg shadow-yellow-600/10' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
                  >
                    <h4 className={`font-bold text-lg mb-1 font-serif ${activeVenue === venue.id ? 'text-yellow-500' : 'text-white'}`}>{venue.name}</h4>
                    <p className="text-xs text-gray-400 line-clamp-1">{venue.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Selector */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b border-slate-800 pb-2">2. Select Layout Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {layouts.map(layout => (
                  <button
                    key={layout.id}
                    onClick={() => setActiveLayout(layout.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 text-center gap-3 ${activeLayout === layout.id ? 'bg-yellow-600 text-slate-950 border-yellow-600 shadow-lg shadow-yellow-600/20' : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-600 hover:text-white'}`}
                  >
                    {layout.icon}
                    <span className="text-xs font-bold">{layout.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity Output Widget */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full blur-2xl"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Live Specifications</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1 flex items-center gap-1"><Maximize className="w-3 h-3" /> Total Area</p>
                  <p className="text-xl font-bold text-white">{venueData.area}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1 flex items-center gap-1"><Ruler className="w-3 h-3" /> Ceiling</p>
                  <p className="text-xl font-bold text-white">{venueData.ceiling}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-800">
                <p className="text-gray-500 text-xs font-bold uppercase mb-2 flex items-center gap-1"><Users className="w-4 h-4 text-yellow-600" /> Max Guest Capacity</p>
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={currentCapacity}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="text-5xl font-serif font-bold text-yellow-500"
                    >
                      {currentCapacity}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-gray-400">Guests</span>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: THE SCHEMATIC VIEWER         */}
          {/* ========================================== */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* The Canvas */}
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-4 shadow-2xl">
              <div className="flex items-center justify-between px-4 pb-4 border-b border-slate-800 mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <MonitorPlay className="w-4 h-4 text-yellow-600" /> Schematic View: {layouts.find(l => l.id === activeLayout).name}
                </h3>
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono uppercase tracking-wider border border-slate-700">Top-Down</span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div key={`${activeVenue}-${activeLayout}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}>
                  {renderSchematic()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 bg-slate-900 border border-slate-800 text-white font-bold py-4 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isDownloading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Download className="w-5 h-5 text-gray-400" /> Download PDF Blueprint</>}
              </button>
              
              {/* --- UPDATED LINK TO CUSTOM RENDERING PAGE --- */}
              <Link to="/events/custom-render" className="flex-1 bg-yellow-600 text-slate-950 font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-600/20 flex items-center justify-center gap-3 group">
                Request Custom Rendering <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EventFloorplan;