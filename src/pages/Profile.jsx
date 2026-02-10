import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Star, Calendar, MapPin, CreditCard, Shield, Clock } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  // Protect the route: If no user, kick them to login
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header Card */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-yellow-500 rounded-full flex items-center justify-center text-4xl font-bold text-slate-900 shadow-xl border-4 border-slate-800">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-serif font-bold">{user.name}</h1>
                <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                  {user.tier} Member
                </span>
              </div>
              <p className="text-gray-400">{user.email} • Member since {user.memberSince}</p>
            </div>
            
            <div className="md:ml-auto flex gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-yellow-500">12</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Nights</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-500">03</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Bookings</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-500">4.9</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Menu */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-slate-900 mb-4">Account</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-3 p-2 bg-yellow-50 text-yellow-700 rounded-lg font-medium cursor-pointer">
                  <UserIcon className="w-4 h-4" /> Personal Info
                </li>
                <li className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <CreditCard className="w-4 h-4" /> Payments & Cards
                </li>
                <li className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Shield className="w-4 h-4" /> Security
                </li>
                <li className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Star className="w-4 h-4" /> Travel Preferences
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Upcoming Trip */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Upcoming Trips</h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900">The Royal Atlantis</h3>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Confirmed</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Palm Jumeirah, Dubai
                    </p>
                    <div className="flex gap-6 border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Check In</p>
                        <p className="text-sm font-bold text-slate-900">Mar 15, 2026</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Check Out</p>
                        <p className="text-sm font-bold text-slate-900">Mar 20, 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Trips (Simple List) */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Past Stays</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                <div className="p-4 flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">Grand Hotel Tremezzo</h4>
                    <p className="text-xs text-gray-500">Oct 12 - Oct 15, 2025</p>
                  </div>
                  <button className="ml-auto text-sm font-bold text-yellow-600 hover:underline">View Receipt</button>
                </div>
                <div className="p-4 flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2030&auto=format&fit=crop" className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">Four Seasons Bora Bora</h4>
                    <p className="text-xs text-gray-500">Aug 05 - Aug 12, 2025</p>
                  </div>
                  <button className="ml-auto text-sm font-bold text-yellow-600 hover:underline">View Receipt</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper
const UserIcon = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

export default Profile;