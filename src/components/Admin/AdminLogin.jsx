import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

const AdminLogin = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showOfflineBypass, setShowOfflineBypass] = useState(false);
  const [offlineToken, setOfflineToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        // Always show bypass option on ANY error for now since the DB is unstable
        // and it's helpful for the owner to have a back door.
        setShowOfflineBypass(true);
      } else {
        onLogin(data.user);
      }
    } catch (err) {
      setError("Connection issue: " + err.message);
      setShowOfflineBypass(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOfflineAccess = () => {
    // A simple local bypass for the owner during maintenance
    // Using a simple check so they can at least view their dashboard locally
    if (offlineToken === 'ARTISAN_OFFLINE') {
      onLogin({ id: 'offline-admin', email: 'admin@minimalisticart.co', is_offline: true });
    } else {
      setError('Invalid maintenance token.');
    }
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

        {showOfflineBypass && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 pt-8 border-t-2 border-brand-accent/30 space-y-4 bg-brand-accent/5 p-6 rounded-xl"
          >
            <div className="text-center">
              <h3 className="text-sm font-serif text-brand-accent font-bold">Try Emergency Access</h3>
              <p className="text-[10px] text-brand-dark/60 dark:text-brand-light/60 uppercase tracking-widest mt-2 leading-relaxed">
                The database is reachable but unresponsive. Use your artisan token to enter safely.
              </p>
            </div>
            
            <input
              type="password"
              placeholder="Enter Maintenance Token..."
              className="w-full px-4 py-2 text-center text-xs border border-brand-dark/10 dark:border-white/10 rounded-lg bg-transparent focus:outline-none focus:border-brand-accent transition-all font-serif italic"
              value={offlineToken}
              onChange={(e) => setOfflineToken(e.target.value)}
            />
            
            <button
              onClick={handleOfflineAccess}
              className="w-full py-2 text-[10px] uppercase tracking-[0.2em] bg-brand-accent/5 text-brand-accent border border-brand-accent/20 rounded-lg hover:bg-brand-accent hover:text-white transition-all font-bold"
            >
              Emergency Access
            </button>
          </motion.div>
        )}

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
