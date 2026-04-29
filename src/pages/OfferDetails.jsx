import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Info,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { offersData } from "../data/offersData";

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the specific offer
  const offer = offersData.find((o) => o.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!offer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <h2 className="text-3xl font-serif font-bold mb-4">Offer Not Found</h2>
        <Link
          to="/offers"
          className="text-yellow-600 flex items-center gap-2 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Offers
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24 selection:bg-yellow-600/30">
      {/* 1. HERO SECTION */}
      <div className="relative h-[65vh] w-full">
        <div className="absolute inset-0">
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 md:px-6 max-w-7xl pb-16 z-10">
          <Link
            to="/offers"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold mb-8 group w-max"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Offers
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-yellow-600 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> {offer.badge}
              </span>
              <span className="text-yellow-400 font-bold text-sm uppercase tracking-widest">
                {offer.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-xl max-w-4xl leading-tight">
              {offer.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* 2. CONTENT SECTION (Split Layout) */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column: Details & Inclusions */}
          <div className="lg:w-2/3 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
              About This Experience
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              {offer.fullDescription}
            </p>

            <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-yellow-600 w-6 h-6" /> What's
              Included
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {offer.inclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-gray-100"
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-[1.5rem] p-8">
              <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-yellow-500 w-5 h-5" /> Terms &
                Conditions
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {offer.terms}
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Action Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 bg-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/60 border border-gray-100 flex flex-col gap-6">
              <div className="pb-6 border-b border-gray-100 text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Package Price
                </p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-5xl font-serif font-bold text-slate-900">
                    ${offer.offerPrice}
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-sm text-gray-400 line-through">
                      ${offer.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-green-600">
                      Save ${offer.originalPrice - offer.offerPrice}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Total price per package, taxes included.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm p-4 bg-slate-50 rounded-xl">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Valid Until
                  </span>
                  <span className="font-bold text-slate-900">
                    {offer.validUntil}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm p-4 bg-slate-50 rounded-xl">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Minimum Stay
                  </span>
                  <span className="font-bold text-slate-900">
                    {offer.minimumStay}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/search")}
                className="w-full bg-yellow-600 hover:bg-slate-900 text-slate-900 hover:text-white font-bold py-5 rounded-xl transition-colors duration-300 shadow-xl mt-4 text-lg"
              >
                Claim Offer & Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
