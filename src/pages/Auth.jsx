import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Toggle between Login and Sign Up mode
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fields start completely empty
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      // Create user object based on what they typed
      const userData = {
        name: isLoginMode ? (formData.email.split('@')[0] || 'Guest') : formData.name,
        email: formData.email,
        memberSince: new Date().getFullYear().toString(),
        tier: 'Gold Member'
      };

      login(userData); // Save to Global Context
      setIsLoading(false);
      
      // FIX: Redirects to the main Home Page instead of the Profile Dashboard
      navigate('/'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* Container */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 min-h-[600px]">
        
        {/* Left Side: Image/Branding */}
        <div className="md:w-1/2 relative hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdGVsfGVufDB8fDB8fHww" 
            alt="Luxury Hotel" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col justify-between p-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">LuxeStay.</h2>
              <p className="text-gray-300 text-lg font-light leading-relaxed">
                Experience unparalleled luxury. Sign in to access your exclusive member benefits, upcoming itineraries, and priority bookings.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <CheckCircle className="w-5 h-5 text-yellow-500" /> <span>Best price guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <CheckCircle className="w-5 h-5 text-yellow-500" /> <span>Complimentary room upgrades</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <CheckCircle className="w-5 h-5 text-yellow-500" /> <span>Earn LuxePoints on every stay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">
              {isLoginMode ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-gray-500">
              {isLoginMode ? 'Enter your details to access your account.' : 'Join LuxeStay to start earning rewards.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field (Only shows on Sign Up) */}
            {!isLoginMode && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="space-y-2"
              >
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    name="name"
                    required={!isLoginMode}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-yellow-600 focus:bg-white transition-all" 
                  />
                </div>
              </motion.div>
            )}

            {/* Email Field - PLACEHOLDER REMOVED */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  name="email"
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-yellow-600 focus:bg-white transition-all" 
                />
              </div>
            </div>

            {/* Password Field - PLACEHOLDER REMOVED */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Password</label>
                {isLoginMode && (
                  <button type="button" className="text-xs font-bold text-yellow-600 hover:text-yellow-700">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  name="password"
                  required 
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-yellow-600 focus:bg-white transition-all" 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-yellow-600 transition-colors shadow-xl flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLoginMode ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-8 text-center text-sm text-gray-500">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setFormData({ name: '', email: '', password: '' }); // Clear form on toggle
              }}
              className="font-bold text-slate-900 hover:text-yellow-600 transition-colors"
            >
              {isLoginMode ? 'Sign up' : 'Sign in'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;