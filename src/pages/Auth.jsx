import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form States
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      // 1. DETERMINE THE NAME
      let finalName = "Guest";

      if (!isLogin) {
        // CASE A: SIGN UP -> Use the Manual Input Name
        finalName = formData.name;
        if (!finalName) finalName = "New Member"; // Fallback if they left it empty
      } else {
        // CASE B: LOGIN -> Generate name from Email (since we have no DB)
        // Example: "alex@gmail.com" -> "Alex"
        const emailName = formData.email.split('@')[0];
        finalName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      }

      // 2. CREATE THE USER OBJECT
      const mockUser = {
        name: finalName, // Uses the manual input or email-derived name
        email: formData.email,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        tier: "Member"
      };

      login(mockUser); // Save to Context
      setIsLoading(false);
      navigate('/'); // Redirect to Home
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      
      {/* LEFT SIDE - VISUALS */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="relative z-10 p-12 text-white max-w-lg">
          <motion.div
            key={isLogin ? "login-text" : "signup-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-serif font-bold mb-6">
              {isLogin ? "Welcome Back." : "Join the Elite."}
            </h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              {isLogin 
                ? "Access your exclusive bookings and rewards." 
                : "Unlock members-only rates and VIP experiences."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
        <div className="w-full max-w-md relative z-10">
          
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <Link to="/" className="text-2xl font-serif font-bold tracking-wider inline-block mb-8">
              LUXE<span className="text-yellow-600">STAY</span>
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-gray-500">
              {isLogin ? "New here? " : "Already a member? "}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ name: '', email: '', password: '' }); // Clear form on toggle
                }} 
                className="text-yellow-600 font-bold hover:underline"
              >
                {isLogin ? "Create account" : "Log in"}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* NAME INPUT - ONLY SHOWS IF SIGNING UP (!isLogin) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group overflow-hidden"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-600" />
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange} 
                    placeholder="Full Name" 
                    required={!isLogin} // Required only for signup
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all" 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* EMAIL INPUT */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-600" />
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                placeholder="Email Address" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all" 
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-600" />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password}
                onChange={handleChange} 
                placeholder="Password" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-4 outline-none focus:border-yellow-600 focus:bg-white transition-all" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-900">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* SUBMIT BUTTON */}
            <button disabled={isLoading} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-yellow-600 transition-all shadow-lg flex items-center justify-center gap-2">
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Sign Up"} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;