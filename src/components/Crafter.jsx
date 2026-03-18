import React from 'react';
import { motion } from 'framer-motion';

const Crafter = () => {
  return (
    <section id="crafter" className="py-24 lg:py-32 bg-brand-light dark:bg-brand-dark min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[3/4] overflow-hidden group">
              <div className="absolute inset-0 bg-brand-dark/5 dark:bg-brand-light/5 z-10 transition-colors duration-500"></div>
              <img 
                src="/crafter.jpeg" 
                alt="Portrait of the Crafter" 
                width={600}
                height={800}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-brand-dark/10 dark:border-brand-light/10 z-0 hidden lg:block translate-y-8 -translate-x-8"></div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 max-w-lg"
          >
            <span className="text-brand-accent text-sm tracking-[0.2em] uppercase font-semibold block mb-4">Behind the Stitches</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight text-brand-dark dark:text-brand-light">
              Meet <br /> Prantika
            </h2>
            
            <div className="space-y-6 text-brand-dark/70 dark:text-brand-light/70 font-light leading-relaxed">
              <p>
                Every piece in this collection is the result of countless hours of dedication, precision, and a deep-rooted passion for tactile art. Moving away from mass production, I believe in the quiet luxury of things created slowly by hand.
              </p>
              <p>
                My journey into crochet began as a meditative practice, weaving single threads into cohesive, structural forms. Today, each keychain, muffler, and floral bouquet represents an intention—to bring a sense of calm, durability, and simplistic beauty into your daily life.
              </p>
              <p>
                Using only premium, sustainably sourced yarns, I ensure that the minimal aesthetic is matched perfectly by heirloom-level quality. This is more than craft; it is a shared language of comfort and care.
              </p>
            </div>
            
            <div className="mt-12 flex items-center space-x-6">
              <div className="w-16 h-[1px] bg-brand-dark/20 dark:bg-brand-light/20"></div>
              <span className="font-serif italic text-xl">Prantika</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Crafter;
