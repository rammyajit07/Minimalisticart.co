import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = -80; // Handle fixed header height 
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-brand-light/90 dark:bg-brand-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-24 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="font-serif text-2xl font-medium tracking-tight hover:opacity-80 transition-opacity">
              minimalisticart<span className="text-brand-accent">.co</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#gallery" className="text-sm tracking-wide uppercase hover:text-brand-accent transition-colors">Gallery</a>
            <a href="#about" className="text-sm tracking-wide uppercase hover:text-brand-accent transition-colors">About</a>
            <a href="#crafter" className="text-sm tracking-wide uppercase hover:text-brand-accent transition-colors">Crafter</a>
            
            <div className="w-px h-4 bg-brand-dark/20 dark:bg-brand-light/20"></div>
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:text-brand-accent transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:text-brand-accent transition-colors"
            >
              {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:text-brand-accent transition-colors"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden absolute w-full top-full left-0 border-t border-b border-black/5 dark:border-white/5 bg-brand-light dark:bg-brand-dark shadow-2xl gpu-accelerated"
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <div className="px-6 py-6 space-y-6 flex flex-col">
              <a href="#gallery" onClick={(e) => handleScroll(e, 'gallery')} className="text-lg font-serif hover:text-brand-accent transition-colors">Gallery</a>
              <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-lg font-serif hover:text-brand-accent transition-colors">About</a>
              <a href="#crafter" onClick={(e) => handleScroll(e, 'crafter')} className="text-lg font-serif hover:text-brand-accent transition-colors">Crafter</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
