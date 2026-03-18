import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Feather, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: <Feather size={28} strokeWidth={1} />,
    title: 'Minimalist Essence',
    text: 'Every piece is hand-crocheted to ensure it embodies the true spirit of minimalism, reducing distraction and enhancing focus.'
  },
  {
    icon: <Sparkles size={28} strokeWidth={1} />,
    title: 'Premium Quality',
    text: 'We partner directly with visionary crafters using only the finest quality yarns for lasting impact.'
  },
  {
    icon: <Shield size={28} strokeWidth={1} />,
    title: 'Authenticity Guaranteed',
    text: 'Each artwork arrives with a certificate of authenticity, ensuring provenance and lifelong value for collectors.'
  }
];

const FeaturedBenefits = () => {
  return (
    <section className="py-24 lg:py-32 bg-brand-dark text-brand-light dark:bg-[#111] border-y border-white/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
              Craft that speaks <br/>
              through silence.
            </h2>
            <p className="text-brand-light/70 font-light max-w-md leading-relaxed mb-10">
              We believe that true luxury lies in simplicity. Our gallery exists for those who find profound meaning in handmade textures, clean lines, and intentional forms.
            </p>
            <div className="w-24 h-[1px] bg-brand-accent"></div>
          </motion.div>

          {/* Asymmetrical Spacing & List */}
          <div className="flex flex-col space-y-12 lg:pl-12">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                className="flex items-start space-x-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="text-brand-accent mt-1 p-3 rounded-full border border-brand-accent/20 bg-brand-accent/5 backdrop-blur-sm">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-wide mb-3">{benefit.title}</h3>
                  <p className="text-brand-light/60 font-light text-sm leading-relaxed max-w-sm">
                    {benefit.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedBenefits;
