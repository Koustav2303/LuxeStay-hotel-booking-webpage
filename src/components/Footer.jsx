import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* TOP SECTION: Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-16 border-b border-slate-800">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-serif font-bold mb-3">Join the Luxe List</h3>
            <p className="text-gray-400 font-light">Subscribe to receive exclusive offers, private charter updates, and early access to our curated experiences.</p>
          </div>
          <div className="w-full md:w-1/2 max-w-md">
            <form className="relative flex items-center">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 text-white outline-none focus:border-yellow-500 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="absolute right-2 w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-slate-900" />
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-serif font-bold tracking-wider inline-block">
              LUXE<span className="text-yellow-500">STAY</span>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed text-sm">
              Redefining luxury hospitality. From sky-high dining to private aviation, experience a world where your every desire is anticipated.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-600 hover:text-slate-900 transition-all text-gray-400"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-600 hover:text-slate-900 transition-all text-gray-400"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-600 hover:text-slate-900 transition-all text-gray-400"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-600 hover:text-slate-900 transition-all text-gray-400"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/rooms" className="hover:text-yellow-500 transition-colors">Rooms & Suites</Link></li>
              <li><Link to="/experiences" className="hover:text-yellow-500 transition-colors">Curated Experiences</Link></li>
              <li><Link to="/offers" className="hover:text-yellow-500 transition-colors">Exclusive Offers</Link></li>
              <li><Link to="/search" className="hover:text-yellow-500 transition-colors">Find a Destination</Link></li>
              <li><Link to="/profile" className="hover:text-yellow-500 transition-colors">Member Dashboard</Link></li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide">Luxury Services</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/dining" className="hover:text-yellow-500 transition-colors">Fine Dining</Link></li>
              <li><Link to="/spa" className="hover:text-yellow-500 transition-colors">Spa & Wellness</Link></li>
              <li><Link to="/charters" className="hover:text-yellow-500 transition-colors">Yachts & Aviation</Link></li>
              <li><Link to="/events" className="hover:text-yellow-500 transition-colors">Weddings & Galas</Link></li>
              <li><Link to="/charters" className="hover:text-yellow-500 transition-colors">Airport Transfers</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-600 shrink-0" />
                <span>100 Luxury Way, Palm Jumeirah<br/>Dubai, UAE 00000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-600 shrink-0" />
                <span>+971 4 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-600 shrink-0" />
                <span>concierge@luxestay.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR: Copyright & Developer Credit */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} LuxeStay Resorts & Hotels. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link to="/" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-yellow-500 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-yellow-500 transition-colors">Sitemap</Link>
          </div>
          
          <p className="font-medium">
            Designed & Built by <a href="https://github.com/koustav2303" target="_blank" rel="noreferrer" className="text-yellow-600 hover:text-yellow-500 transition-colors">Koustav Pan</a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;