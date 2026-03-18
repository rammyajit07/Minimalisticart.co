import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const CTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('You are already subscribed!');
        } else {
          throw error;
        }
        setStatus('error');
      } else {
        setMessage('Thank you! You are now subscribed.');
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-brand-light dark:bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-brand-dark dark:border-brand-light rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-brand-dark dark:border-brand-light rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-brand-accent font-serif italic text-xl mb-4">Start your collection</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 text-brand-dark dark:text-brand-light leading-tight">
            Embrace the art of <br/> less is more.
          </h2>
          <p className="text-brand-dark/60 dark:text-brand-light/60 font-light max-w-xl mx-auto mb-12">
            Join our exclusive mailing list to receive early access to new minimalist collections and private viewing invitations.
          </p>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row relative group mb-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-transparent border-b border-brand-dark/20 dark:border-brand-light/20 py-4 px-2 text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 focus:outline-none focus:border-brand-dark dark:focus:border-brand-light transition-colors disabled:opacity-50"
                required
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:bottom-0 sm:h-full px-4 text-xs tracking-widest uppercase font-medium hover:text-brand-accent transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            </form>

            <AnimatePresence>
              {(status === 'success' || status === 'error') && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs uppercase tracking-widest font-medium ${status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-brand-accent'}`}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
