import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Globe, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Policy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-yellow-600" />,
      title: "Information We Collect",
      content: "We collect information that you provide directly to us when you make a reservation, create an account, or contact our concierge. This includes your name, email address, phone number, payment information, and any special requests or preferences to enhance your stay."
    },
    {
      icon: <Globe className="w-6 h-6 text-yellow-600" />,
      title: "How We Use Your Data",
      content: "Your data allows us to provide a seamless hospitality experience. We use it to process transactions, send booking confirmations, personalize your on-site preferences (such as room temperature or dietary needs), and send exclusive invitations to the Luxe List."
    },
    {
      icon: <Lock className="w-6 h-6 text-yellow-600" />,
      title: "Data Security",
      content: "LuxeStay employs enterprise-grade encryption and secure socket layer (SSL) technology to protect your personal information. We restrict access to your data to only those employees who need it to provide our signature services."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-yellow-600" />,
      title: "Third-Party Disclosure",
      content: "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except for trusted partners who assist us in operating our website and conducting our business (such as private charter operators or secure payment processors)."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 font-light selection:bg-yellow-600/30">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-yellow-600 hover:text-slate-900 transition-colors font-bold text-sm uppercase tracking-widest mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 font-light">Last updated: April 2026. Your privacy is paramount to the LuxeStay experience.</p>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 space-y-12 relative overflow-hidden"
        >
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <section className="relative z-10">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-yellow-600" /> Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to LuxeStay. We are committed to protecting your personal data and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact our Data Protection Office at privacy@luxestay.com.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            {sections.map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          <section className="pt-8 border-t border-gray-100 relative z-10">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Cookies & Tracking</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies to understand and save your preferences for future visits. These allow us to remember your preferred language, currency, and the specific resorts you have viewed to provide a more tailored experience.
            </p>
            <button className="text-yellow-600 font-bold hover:underline transition-all">Manage Cookie Preferences</button>
          </section>

          <div className="bg-slate-900 rounded-2xl p-8 text-white relative z-10 shadow-2xl">
            <h3 className="text-xl font-serif font-bold mb-2">Concierge Support</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">If you wish to request a copy of your data or exercise your right to be forgotten, our digital concierge is available to assist you via your dashboard.</p>
            <Link to="/profile" className="bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors inline-block shadow-lg">
              Visit Member Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Policy;