import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discover',
    text: 'Explore our curated collections of minimal crochet crafts, designed to inspire calm and contemplation.'
  },
  {
    num: '02',
    title: 'Connect',
    text: 'Read the stories behind the craft and the creators who poured their vision into every stitch.'
  },
  {
    num: '03',
    title: 'Acquire',
    text: 'Secure your chosen piece with ease. We handle the shipping and delicate, sustainable packaging.'
  }
];

const HowItWorks = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-brand-light dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center md:text-left">
        
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-brand-accent text-sm tracking-[0.2em] uppercase font-semibold block mb-4">The Process</span>
            <h2 className="text-3xl md:text-5xl font-serif">Curating Your Space</h2>
          </div>
          <p className="max-w-md text-brand-dark/60 dark:text-brand-light/60 font-light">
            Bringing handmade minimalism into your home or office is a journey we are honored to guide you through.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              className="relative pt-8 md:pt-12 text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              {/* Thin Section Divider */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-dark/10 dark:bg-brand-light/10"></div>
              
              <div className="text-brand-accent/50 text-6xl font-serif italic mb-6">
                {step.num}
              </div>
              <h3 className="text-xl font-medium mb-4">{step.title}</h3>
              <p className="text-brand-dark/60 dark:text-brand-light/60 font-light leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
