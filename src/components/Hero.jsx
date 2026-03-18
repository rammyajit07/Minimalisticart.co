import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-brand-dark/20 dark:bg-brand-dark/40 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        >
          <img 
            src="/muffler1.jpeg" 
            alt="Handcrafted Crochet"
            fetchpriority="high"
            className="w-full h-full object-cover grayscale-[20%] opacity-70 blur-[3px]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light/40 to-brand-light/95 dark:from-brand-dark/40 dark:to-brand-dark/95 mix-blend-normal sm:mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center md:items-start w-full mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-center md:text-left"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight text-brand-dark dark:text-brand-light mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Where Craft <br />
            <span className="italic text-brand-dark/70 dark:text-brand-light/70">Meets Comfort</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-brand-dark/60 dark:text-brand-light/60 font-light mb-10 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover curated collections of handmade crochet keychains, mufflers, and elegant flower bouquets designed to breathe warmth into your life.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="#gallery" className="inline-block border border-brand-dark dark:border-brand-light px-8 py-4 uppercase tracking-widest text-sm hover:bg-brand-dark hover:text-brand-light dark:hover:bg-brand-light dark:hover:text-brand-dark transition-all duration-300">
              Explore Collection
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-4 writing-vertical-rl transform rotate-180">Scroll</span>
        <div className="w-[1px] h-12 bg-brand-dark dark:bg-brand-light overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-brand-accent transform origin-top"
            animate={{ scaleY: [0, 1, 0], translateY: ['0%', '0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
