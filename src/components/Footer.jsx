import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t-4 border-yellow-600">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold tracking-wider">
              LUXE<span className="text-yellow-500">STAY</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the pinnacle of luxury. We curate the world's most exclusive stays for the discerning traveler.
            </p>
            <div className="flex space-x-4 pt-2">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Destinations</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Luxury Rooms</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Spa & Wellness</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Private Dining</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span>123 Paradise Road, Maldives</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>concierge@luxestay.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
              />
              <button className="bg-yellow-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 LuxeStay Hotels. All rights reserved. | Koustav Pan</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;