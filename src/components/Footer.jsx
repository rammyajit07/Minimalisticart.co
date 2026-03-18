import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const Footer = ({ onAdminClick }) => {
  return (
    <footer className="border-t border-brand-dark/10 dark:border-brand-light/10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-serif text-2xl font-medium tracking-tight">
              minimalisticart<span className="text-brand-accent">.co</span>
            </h3>
            <p className="max-w-xs mx-auto md:mx-0 text-sm text-brand-dark/70 dark:text-brand-light/70 font-light leading-relaxed">
              Curating spaces with purpose. Where simplicity meets art, and every piece tells a quiet story.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-medium">Explore</h4>
            <div className="flex flex-col space-y-4">
              <a href="#gallery" className="text-sm hover:text-brand-accent transition-colors">Gallery</a>
              <a href="#crafter" className="text-sm hover:text-brand-accent transition-colors">Crafter</a>
              <a href="#about" className="text-sm hover:text-brand-accent transition-colors">Our Story</a>
            </div>
          </div>

          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h4 className="text-xs uppercase tracking-widest font-medium">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.instagram.com/minimalisticart.co?igsh=MWl4azVrMzQ2aHF1eA==" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-dark/10 dark:border-brand-light/10 hover:border-brand-accent hover:text-brand-accent rounded-full transition-all">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="mailto:contact@minimalisticart.co" className="p-2 border border-brand-dark/10 dark:border-brand-light/10 hover:border-brand-accent hover:text-brand-accent rounded-full transition-all">
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
            
            <button 
              onClick={onAdminClick}
              className="mt-8 text-[10px] uppercase tracking-[0.2em] opacity-20 hover:opacity-100 hover:text-brand-accent transition-all duration-500 font-medium"
            >
              Admin Portal
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-dark/5 dark:border-brand-light/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-brand-dark/50 dark:text-brand-light/50 font-light">
          <p>&copy; {new Date().getFullYear()} Minimalistic Art. All rights reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-brand-dark dark:hover:text-brand-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-dark dark:hover:text-brand-light transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
