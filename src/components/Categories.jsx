import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Categories = () => {
  const { categories, products, loading, setActiveFilter } = useStore();

  const defaultCategories = [
    {
      id: 1,
      name: 'Crochet Keychain',
      description: 'Handcrafted miniature art for your daily essentials.',
      image_url: '/keychain1.jpeg'
    },
    {
      id: 2,
      name: 'Crochet Mufflers',
      description: 'Elegant warmth woven with precision and care.',
      image_url: '/muffler1.jpeg'
    },
    {
      id: 3,
      name: 'Flower Bouquets',
      description: 'Everlasting blooms for intentional gifting.',
      image_url: '/boquet1.jpeg'
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  // Auto-fill category backgrounds using the first product image if category image is missing
  const categoriesWithImages = displayCategories.map(cat => {
    if (cat.image_url && cat.image_url !== '') return cat;
    const firstProd = products.find(p => p.category_id === cat.id);
    return { ...cat, image_url: firstProd?.image_url || '/hero_art_minimal.png' };
  });

  if (loading) return null;

  return (
    <section id="categories" className="py-24 lg:py-32 bg-brand-light dark:bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Curated Handcrafts</h2>
            <p className="text-brand-dark/60 dark:text-brand-light/60 font-light">
              Explore intricate crochet pieces spanning diverse styles, unified by a commitment to minimalist aesthetic and exceptional quality.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoriesWithImages.map((category, idx) => (
            <motion.div 
              key={category.id || idx}
              className="group relative h-[600px] overflow-hidden bg-brand-dark/5 dark:bg-brand-light/5 cursor-pointer"
              onClick={() => {
                const filterValue = category.name.toUpperCase();
                setActiveFilter(filterValue);
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="absolute inset-0">
                <img 
                  src={category.image_url} 
                  alt={category.name} 
                  width={600}
                  height={800}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 dark:group-hover:bg-brand-light/5 transition-colors duration-500" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-10 text-brand-dark dark:text-brand-light z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2 block font-medium">Category</span>
                <h3 className="text-3xl font-serif mb-3 italic">{category.name}</h3>
                <div className="min-h-[60px]"> {/* Fixed height container for description to keep titles aligned */}
                  <p className="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs lowercase leading-relaxed">
                    {category.description || 'handcrafted artisan crochet collection.'}
                  </p>
                </div>
                <div className="mt-4 flex items-center space-x-2 text-xs uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span>View in Gallery</span>
                  <ArrowRight size={14} className="text-brand-accent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
