import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

const AdminLogin = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      onLogin(data.user);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light dark:bg-brand-dark px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-[#111] border border-brand-dark/5 dark:border-white/5 shadow-2xl rounded-2xl"
      >
        <div className="text-center">
          <h2 className="text-3xl font-serif">Admin Portal</h2>
          <p className="mt-2 text-sm text-brand-dark/50 dark:text-brand-light/50 font-light">
            Please sign in to manage your gallery.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest font-medium mb-1 block">Email Address</label>
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-brand-dark/10 dark:border-white/10 placeholder-brand-dark/30 dark:placeholder-white/30 text-brand-dark dark:text-brand-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-transparent transition-all sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest font-medium mb-1 block">Password</label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-brand-dark/10 dark:border-white/10 placeholder-brand-dark/30 dark:placeholder-white/30 text-brand-dark dark:text-brand-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-transparent transition-all sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-brand-light bg-brand-dark hover:bg-brand-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark dark:bg-brand-light dark:text-brand-dark dark:hover:bg-brand-light/90 transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={onBack}
            className="text-xs uppercase tracking-widest font-medium opacity-40 hover:opacity-100 transition-opacity"
          >
            ← Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
