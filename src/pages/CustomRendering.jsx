import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, PenTool, Layers, UploadCloud, X, FileText, CheckCircle, Send, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomRendering = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FORM & UPLOAD STATE ---
  const [formData, setFormData] = useState({
    agencyName: '',
    contactName: '',
    email: '',
    venue: 'Grand Astor Ballroom',
    renderType: '3D Photorealistic Walkthrough',
    software: 'AutoCAD (.dwg)',
    details: ''
  });

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // --- HANDLERS ---
  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Simulated Drag & Drop Logic
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 3000);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-light selection:bg-yellow-600/30 pb-24">
      
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl shadow-yellow-600/10">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Brief Submitted</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our Architectural Design Team has received your brief and moodboards for the <span className="text-white font-bold">{formData.venue}</span>. A technical director will reach out within 24 hours to discuss the wireframing phase.
              </p>
              <Link to="/events/floorplan" className="inline-block bg-yellow-600 text-slate-950 font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors">
                Return to Architect
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP NAV BAR */}
      <div className="pt-28 pb-6 px-6 container mx-auto max-w-7xl border-b border-white/5">
        <Link to="/events/floorplan" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-400 transition-colors text-sm font-bold uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Floorplans
        </Link>
        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-yellow-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center gap-2">
              <Box className="w-4 h-4" /> LuxeStay Design Studio
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              Custom 3D Rendering
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Commission our in-house architectural team to build a bespoke 3D spatial simulation, VR walkthrough, or AutoCAD schematic of your upcoming gala.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: THE PROCESS STUDIO            */}
          {/* ========================================== */}
          <div className="w-full lg:w-1/3 space-y-8 hidden md:block">
            <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-serif font-bold text-white mb-8">The Studio Process</h3>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-yellow-600 before:via-slate-700 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-yellow-600 text-slate-950 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg shadow-yellow-600/20 z-10">1</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <h4 className="font-bold text-white mb-1 flex items-center gap-2"><PenTool className="w-4 h-4 text-yellow-600" /> Intake</h4>
                    <p className="text-xs text-gray-500">Submit moodboards, vendor lists, and spatial requirements.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 text-gray-400 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">2</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-slate-950 border border-slate-800 opacity-50">
                    <h4 className="font-bold text-white mb-1 flex items-center gap-2"><Layers className="w-4 h-4" /> Wireframe</h4>
                    <p className="text-xs text-gray-500">Initial CAD generation and lighting simulation.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 text-gray-400 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">3</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-slate-950 border border-slate-800 opacity-50">
                    <h4 className="font-bold text-white mb-1 flex items-center gap-2"><MonitorPlay className="w-4 h-4" /> Final Render</h4>
                    <p className="text-xs text-gray-500">Delivery of photorealistic 4K outputs and VR links.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: TECHNICAL INTAKE FORM        */}
          {/* ========================================== */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-2xl space-y-10">
              
              {/* Client Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-white border-b border-slate-800 pb-4">Production Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Planning Agency / Firm</label>
                    <input type="text" name="agencyName" required value={formData.agencyName} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" placeholder="e.g. Apex Event Design" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Lead Architect / Contact</label>
                    <input type="text" name="contactName" required value={formData.contactName} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" placeholder="Full Name" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Executive Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors" placeholder="contact@agency.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Target Venue</label>
                    <select name="venue" value={formData.venue} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors appearance-none cursor-pointer">
                      <option value="Grand Astor Ballroom">The Grand Astor Ballroom</option>
                      <option value="Oceanfront Terrace">Oceanfront Terrace</option>
                      <option value="Executive Summit">The Executive Summit</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-white border-b border-slate-800 pb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Requested Output Format</label>
                    <select name="renderType" value={formData.renderType} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors appearance-none cursor-pointer">
                      <option value="3D Photorealistic Walkthrough">3D Photorealistic Walkthrough (Video)</option>
                      <option value="Interactive VR Environment">Interactive VR Environment (Oculus)</option>
                      <option value="4K Still Renders">High-Res 4K Still Renders (Images)</option>
                      <option value="Technical CAD Schematics">Technical Blueprint Schematics (2D)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Base Architectural File (If Any)</label>
                    <select name="software" value={formData.software} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors appearance-none cursor-pointer">
                      <option value="AutoCAD (.dwg)">AutoCAD (.dwg)</option>
                      <option value="SketchUp (.skp)">SketchUp (.skp)</option>
                      <option value="Vectorworks (.vwx)">Vectorworks (.vwx)</option>
                      <option value="No Base File (Start from scratch)">No Base File (Start from scratch)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Interactive Drag & Drop Upload Zone */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 flex justify-between">
                  <span>Asset Upload</span>
                  <span className="text-gray-600 normal-case font-normal text-[10px]">Max 50MB per file</span>
                </h3>
                
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 relative ${isDragging ? 'border-yellow-500 bg-yellow-600/10' : 'border-slate-700 bg-slate-950 hover:border-slate-500'}`}
                >
                  {/* Hidden file input */}
                  <input type="file" multiple ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                  
                  <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
                    <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-yellow-500' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-white font-bold mb-2">Drag and drop your project files here</p>
                  <p className="text-sm text-gray-500 mb-6">Support for .pdf, .zip, .jpeg, .png, .dwg moodboards and vendor specs.</p>
                  <button type="button" onClick={() => fileInputRef.current.click()} className="bg-slate-800 text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-slate-700 transition-colors">
                    Browse Files
                  </button>
                </div>

                {/* Uploaded Files Preview */}
                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2 mt-4">
                      {files.map((file, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-600/10 rounded-lg"><FileText className="w-4 h-4 text-yellow-500" /></div>
                            <div>
                              <p className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                              <p className="text-[10px] text-gray-500">{file.size}</p>
                            </div>
                          </div>
                          <button type="button" onClick={() => removeFile(index)} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-gray-500">
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Architectural Brief / Notes</label>
                <textarea name="details" rows="4" value={formData.details} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-yellow-600 transition-colors resize-none" placeholder="Describe your lighting preferences, stage dimensions, floral placements, or specific sightline requirements..."></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" disabled={isSubmitting || !formData.agencyName || !formData.contactName} className="w-full bg-yellow-600 text-slate-950 font-bold text-lg py-5 rounded-full hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8">
                {isSubmitting ? <div className="w-6 h-6 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" /> : <><Send className="w-5 h-5" /> Submit Design Brief</>}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomRendering;