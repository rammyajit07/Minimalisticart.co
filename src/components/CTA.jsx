import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
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
            Join our exclusive mailing list to receive early access to new minimalist collections, artist interviews, and private viewing invitations.
          </p>

          <form className="flex flex-col sm:flex-row max-w-md mx-auto relative group">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-transparent border-b border-brand-dark/20 dark:border-brand-light/20 py-4 px-2 text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 focus:outline-none focus:border-brand-dark dark:focus:border-brand-light transition-colors"
              required
            />
            <button 
              type="submit" 
              className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:bottom-0 sm:h-full px-4 text-xs tracking-widest uppercase font-medium hover:text-brand-accent transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
