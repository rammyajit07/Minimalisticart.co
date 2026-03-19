import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Gallery = () => {
  const { products, categories: storeCategories, loading, activeFilter, setActiveFilter } = useStore();
  const [search, setSearch] = useState('');
  const [selectedArt, setSelectedArt] = useState(null);

  // Clear search when filter changes
  React.useEffect(() => {
    setSearch('');
  }, [activeFilter]);

  const defaultArtworks = [
    { id: 1, name: 'Minimalist Keychain', category: 'KEYCHAINS', price: 499, description: 'Single loop cotton stitch.', image_url: '/keychain1.jpeg' },
    { id: 2, name: 'Cloud Muffler', category: 'MUFFLERS', price: 1299, description: 'Super soft merino wool blend.', image_url: '/muffler1.jpeg' },
    { id: 3, name: 'Sunbeam Bouquet', category: 'BOUQUETS', price: 999, description: 'Yellow roses and white lilies.', image_url: '/boquet1.jpeg' },
    { id: 4, name: 'Ocean Mist Keychain', category: 'KEYCHAINS', price: 549, description: 'Sea-foam green with small pearls.', image_url: '/keychain2.jpeg' },
    { id: 5, name: 'Sandbar Muffler', category: 'MUFFLERS', price: 1499, description: 'Earthy beige tones.', image_url: '/mufler2.jpeg' },
    { id: 6, name: 'Twilight Bouquet', category: 'BOUQUETS', price: 1199, description: 'Deep purples and lavender.', image_url: '/boquet2.jpeg' },
    { id: 7, name: 'Charcoal Keychain', category: 'KEYCHAINS', price: 599, description: 'Dark minimalist aesthetic.', image_url: '/keychain3.jpeg' },
    { id: 8, name: 'Snowdrift Muffler', category: 'MUFFLERS', price: 1399, description: 'Pure white chunky knit.', image_url: '/mufler3.jpeg' },
    { id: 9, name: 'Radiant Bouquet', category: 'BOUQUETS', price: 1099, description: 'Vibrant mixed wild flowers.', image_url: '/boquet3.jpeg' }
  ];

  const displayArtworks = products.length > 0 ? products : defaultArtworks;
  
  const displayCategories = storeCategories.length > 0 
    ? ['ALL', ...storeCategories.map(c => c.name.toUpperCase())]
    : ['ALL', 'BOUQUETS', 'KEYCHAINS', 'MUFFLERS'];

  const filteredArtworks = displayArtworks.filter(art => {
    // Determine category name
    let artCat = '';
    if (art.category) {
      artCat = art.category.toUpperCase();
    } else if (art.category_id) {
      const found = storeCategories.find(c => c.id === art.category_id);
      if (found) artCat = found.name.toUpperCase();
    }

    const matchesFilter = activeFilter === 'ALL' || artCat === activeFilter;
    const matchesSearch = art.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return null;

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-brand-light dark:bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-8 md:space-y-0 text-center md:text-left">
          
          <div>
            <span className="text-brand-accent text-sm tracking-[0.2em] uppercase font-semibold block mb-4">Collection</span>
            <h2 className="text-3xl md:text-5xl font-serif">Selected Crafts</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full md:w-auto mt-6 md:mt-0">
            
            {/* Search */}
            <div className="relative group w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search items..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-64 bg-transparent border-b border-brand-dark/20 dark:border-brand-light/20 py-2 pl-8 pr-6 text-sm focus:outline-none focus:border-brand-dark dark:focus:border-brand-light transition-colors placeholder:font-light"
              />
              <Search className="absolute left-0 top-[14px] text-brand-dark/40 dark:text-brand-light/40" size={16} />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-0 top-[14px] text-brand-dark/40 dark:text-brand-light/40 hover:text-brand-dark dark:hover:text-brand-light transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {displayCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full transition-all border ${
                    activeFilter === cat 
                      ? 'border-brand-dark bg-brand-dark text-brand-light dark:border-brand-light dark:bg-brand-light dark:text-brand-dark' 
                      : 'border-brand-dark/10 dark:border-brand-light/10 text-brand-dark/60 dark:text-brand-light/60 hover:border-brand-dark/40 dark:hover:border-brand-light/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <AnimatePresence>
            {filteredArtworks.map((art) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={art.id}
                className="group cursor-pointer"
                onClick={() => setSelectedArt(art)}
              >
                {/* Artwork Card */}
                <div className="relative aspect-[4/5] overflow-hidden bg-white dark:bg-[#111] border border-brand-dark/10 dark:border-brand-light/10 p-4 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_40px_-20px_rgba(255,255,255,0.05)]">
                  <div className="w-full h-full overflow-hidden relative border border-transparent group-hover:border-brand-dark/5 dark:group-hover:border-brand-light/5 transition-colors">
                    <img 
                      src={art.image_url} 
                      alt={art.name} 
                      width={800}
                      height={1000}
                      className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    
                    {/* Hover Overlay Fade-in */}
                    <div className="absolute inset-0 bg-brand-light/90 dark:bg-brand-dark/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500">
                      <h3 className="text-xl font-serif mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">{art.name}</h3>
                      <p className="text-sm tracking-widest uppercase font-medium text-brand-accent translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-100">Handcrafted</p>
                      <span className="mt-8 px-6 py-2 border border-brand-dark dark:border-brand-light text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out delay-150">
                        View Details
                      </span>
                    </div>

                  </div>
                </div>

                {/* Info Below Image */}
                <div className="mt-4 flex justify-between items-start opacity-100 group-hover:opacity-50 transition-opacity duration-300">
                  <div>
                    <h4 className="font-serif text-lg">{art.name}</h4>
                    <p className="text-sm font-light text-brand-dark/60 dark:text-brand-light/60 lowercase italic">
                      {art.category || storeCategories.find(c => c.id === art.category_id)?.name || 'Crochet'}
                    </p>
                  </div>
                  <span className="text-sm font-medium">₹{art.price}</span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredArtworks.length === 0 && (
          <div className="py-24 text-center text-brand-dark/50 dark:text-brand-light/50 font-light">
            No items found matching your criteria.
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-xl" onClick={() => setSelectedArt(null)}></div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-5xl bg-brand-light dark:bg-brand-dark border border-brand-dark/10 dark:border-brand-light/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 z-[110] p-2 bg-brand-light/50 dark:bg-brand-dark/50 backdrop-blur rounded-full border border-brand-dark/10 dark:border-brand-light/10 hover:text-brand-accent transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 bg-[#f8f8f8] dark:bg-[#111] p-8 flex items-center justify-center overflow-hidden">
                <img src={selectedArt.image_url} alt={selectedArt.name} className="max-h-full w-auto object-contain drop-shadow-2xl" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight italic">{selectedArt.name}</h2>
                <p className="font-light leading-relaxed mb-8 text-brand-dark/70 dark:text-brand-light/70">{selectedArt.description}</p>
                
                <div className="border-t border-brand-dark/10 dark:border-brand-light/10 pt-6 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="uppercase tracking-widest text-xs opacity-50">Price</span>
                    <span className="text-2xl font-serif italic text-brand-accent">₹{selectedArt.price}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const message = encodeURIComponent(`Hi! I'm interested in purchasing the "${selectedArt.name}" (₹${selectedArt.price}). Is it available?`);
                    window.open(`https://wa.me/918822418703?text=${message}`, '_blank');
                  }}
                  className="w-full py-4 border border-brand-dark dark:border-brand-light uppercase text-[10px] tracking-[0.3em] font-medium hover:bg-brand-dark hover:text-brand-light dark:hover:bg-brand-light dark:hover:text-brand-dark transition-all duration-500"
                >
                  Inquire to Purchase via WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
