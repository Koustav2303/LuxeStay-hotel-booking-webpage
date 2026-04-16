import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, CreditCard, AlertTriangle, UserCheck, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policies = [
    {
      icon: <UserCheck className="w-6 h-6 text-yellow-600" />,
      title: "1. Acceptance of Terms",
      content: "By accessing and using LuxeStay booking services, you agree to be bound by these Terms of Service. These terms apply to all guests, visitors, and members of the Luxe List accessing our physical properties or digital platforms."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-yellow-600" />,
      title: "2. Booking & Payments",
      content: "A valid credit card is required to secure all reservations. A deposit of 50% of the total stay is charged at the time of booking. The remaining balance, alongside any incidental charges incurred during your stay or charter, will be settled upon checkout."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      title: "3. Cancellations & Modifications",
      content: "Cancellations made up to 14 days prior to arrival will receive a full refund of the deposit. Cancellations made within 14 days of arrival will forfeit the deposit. Modifications to dates or experiences are subject to availability and dynamic rate adjustments."
    },
    {
      icon: <Scale className="w-6 h-6 text-yellow-600" />,
      title: "4. Liability & Disclaimers",
      content: "LuxeStay assumes no liability for personal items lost or damaged during your stay. Guests participating in high-risk curated experiences (e.g., helicopter tours, scuba diving) must sign a separate waiver prior to boarding or participation."
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-gray-500 font-light">Last updated: April 2026. The legal framework ensuring your seamless stay.</p>
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
              <Scale className="w-6 h-6 text-yellow-600" /> General Provisions
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms govern your use of our global resorts, private charter services, and digital concierge applications. We reserve the right to update or modify these terms at any time without prior notice. Your continued use of LuxeStay properties or services constitutes your agreement to follow and be bound by the Terms as modified.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            {policies.map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
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
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Guest Conduct Standards</h2>
            <div className="space-y-4">
              {[
                "Strict adherence to no-smoking policies in designated indoor areas.",
                "Respectful interaction with staff and fellow guests.",
                "Financial responsibility for any property damage caused by the guest's party.",
                "Compliance with local laws and aviation regulations during private charters."
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">{rule}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-slate-900 rounded-2xl p-8 text-white relative z-10 shadow-2xl">
            <h3 className="text-xl font-serif font-bold mb-2">Legal or Dispute Inquiries</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">If you have questions regarding these terms, your billing statement, or require legal clarification, please reach out to our dedicated support team.</p>
            <a href="mailto:legal@luxestay.com" className="bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors inline-block shadow-lg">
              Contact Legal Team
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;