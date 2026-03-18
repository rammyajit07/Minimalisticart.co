import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Upload, LogOut, ChevronLeft, X } from 'lucide-react';

const AdminDashboard = ({ user, onLogout }) => {
  const { products, categories, fetchData } = useStore();
  const [activeTab, setActiveTab] = useState('products');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track if we are editing
  const [loading, setLoading] = useState(false);

  // Form states
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category_id: '',
    new_category_name: '',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewItem({
      name: item.name,
      price: item.price ?? '',
      description: item.description ?? '',
      category_id: item.category_id ?? '',
      new_category_name: '',
      image_url: item.image_url || ''
    });
    setIsAdding(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from('crochet-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('crochet-images')
        .getPublicUrl(filePath);

      setNewItem({ ...newItem, image_url: publicUrl });
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm('This will import all the original keychains, mufflers, and bouquets into your database. Proceed?')) return;
    setLoading(true);
    
    try {
      const defaultCats = [
        { name: 'KEYCHAINS', description: 'Handcrafted miniature art for your daily essentials.', image_url: '/keychain1.jpeg' },
        { name: 'MUFFLERS', description: 'Elegant warmth woven with precision and care.', image_url: '/muffler1.jpeg' },
        { name: 'BOUQUETS', description: 'Everlasting blooms for intentional gifting.', image_url: '/boquet1.jpeg' }
      ];

      const { data: insertedCats, error: catErr } = await supabase
        .from('categories')
        .insert(defaultCats)
        .select();
      
      if (catErr) throw catErr;

      const keychainId = insertedCats.find(c => c.name === 'KEYCHAINS')?.id;
      const mufflerId = insertedCats.find(c => c.name === 'MUFFLERS')?.id;
      const bouquetId = insertedCats.find(c => c.name === 'BOUQUETS')?.id;

      const defaultProds = [
        { name: 'Minimalist Keychain', category_id: keychainId, price: 499, description: 'Single loop cotton stitch.', image_url: '/keychain1.jpeg' },
        { name: 'Cloud Muffler', category_id: mufflerId, price: 1299, description: 'Super soft merino wool blend.', image_url: '/muffler1.jpeg' },
        { name: 'Sunbeam Bouquet', category_id: bouquetId, price: 999, description: 'Yellow roses and white lilies.', image_url: '/boquet1.jpeg' },
        { name: 'Ocean Mist Keychain', category_id: keychainId, price: 549, description: 'Sea-foam green with small pearls.', image_url: '/keychain2.jpeg' },
        { name: 'Sandbar Muffler', category_id: mufflerId, price: 1499, description: 'Earthy beige tones.', image_url: '/mufler2.jpeg' },
        { name: 'Twilight Bouquet', category_id: bouquetId, price: 1199, description: 'Deep purples and lavender.', image_url: '/boquet2.jpeg' },
        { name: 'Charcoal Keychain', category_id: keychainId, price: 599, description: 'Dark minimalist aesthetic.', image_url: '/keychain3.jpeg' },
        { name: 'Snowdrift Muffler', category_id: mufflerId, price: 1399, description: 'Pure white chunky knit.', image_url: '/mufler3.jpeg' },
        { name: 'Radiant Bouquet', category_id: bouquetId, price: 1099, description: 'Vibrant mixed wild flowers.', image_url: '/boquet3.jpeg' }
      ];

      const { error: prodErr } = await supabase.from('products').insert(defaultProds);
      if (prodErr) throw prodErr;

      alert('All original items have been imported successfully!');
      fetchData();
    } catch (err) {
      alert('Error seeding data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let categoryId = newItem.category_id;

      if (newItem.new_category_name) {
        const { data: newCat, error: catError } = await supabase
          .from('categories')
          .insert([{ name: newItem.new_category_name, image_url: newItem.image_url }])
          .select().single();
        if (catError) throw catError;
        categoryId = newCat.id;
      }

      const payload = {
        name: newItem.name,
        description: newItem.description,
        image_url: newItem.image_url
      };
      if (activeTab === 'products') {
        payload.price = newItem.price;
        payload.category_id = categoryId;
      }

      if (editingId) {
        const { error } = await supabase.from(activeTab).update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(activeTab).insert([payload]);
        if (error) throw error;
      }

      setIsAdding(false);
      setEditingId(null);
      setNewItem({ name: '', price: '', description: '', category_id: '', new_category_name: '', image_url: '' });
      fetchData();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (table, id) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) alert(error.message);
    else fetchData();
  };

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark pb-20">
      {/* Admin Nav - Responsive */}
      <nav className="border-b border-brand-dark/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <h1 className="font-serif text-lg sm:text-xl tracking-tight">Artisan Portal</h1>
          <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-light">
            <button onClick={() => setActiveTab('products')} className={`transition-colors ${activeTab === 'products' ? 'text-brand-accent' : ''}`}>Gallery</button>
            <button onClick={() => setActiveTab('categories')} className={`transition-colors ${activeTab === 'categories' ? 'text-brand-accent' : ''}`}>Categories</button>
            <button onClick={onLogout} className="text-red-500/80 hover:text-red-500"><LogOut size={16}/></button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 space-y-6 sm:space-y-0 text-center sm:text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif capitalize">Manage {activeTab}</h2>
            <p className="text-brand-dark/50 dark:text-brand-light/50 font-light mt-1 text-sm">Curate your collection and categories</p>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            <button onClick={handleSeedDefaults} className="px-4 py-2 rounded-full text-xs border border-brand-dark/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Restore Originals</button>
            <button onClick={() => { setEditingId(null); setNewItem({name:'', price:'', description:'', category_id:'', new_category_name:'', image_url:''}); setIsAdding(true); }} className="flex items-center space-x-2 bg-brand-dark text-brand-light dark:bg-brand-light dark:text-brand-dark px-5 py-2 rounded-full text-xs hover:scale-105 transition-transform"><Plus size={16}/><span>Add {activeTab.slice(0, -1)}</span></button>
          </div>
        </div>

        {/* Content List - Responsive Cards */}
        <div className="space-y-4">
          {(activeTab === 'products' ? products : categories).map(item => {
            const displayImage = item.image_url || (activeTab === 'categories' ? products.find(p => p.category_id === item.id)?.image_url : null);
            
            return (
              <div key={item.id} className="bg-white dark:bg-[#111] border border-brand-dark/5 dark:border-white/5 rounded-2xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center space-x-4 flex-1 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 dark:bg-gray-900 overflow-hidden flex-shrink-0 border border-brand-dark/5 dark:border-white/5 shadow-inner">
                      {displayImage ? (
                        <img src={displayImage} className="w-full h-full object-cover"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20"><Plus size={18}/></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-1">
                        <span className="font-serif text-lg sm:text-xl text-brand-dark dark:text-brand-light truncate leading-tight">{item.name}</span>
                        {activeTab === 'products' && (
                          <span className="text-brand-accent font-serif font-medium text-lg">₹{item.price}</span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-brand-dark/40 dark:text-brand-light/40 line-clamp-2 font-light leading-relaxed mb-2 sm:mb-0">
                        {item.description || 'No description yet.'}
                      </div>
                      {activeTab === 'products' && (
                        <div className="inline-flex items-center px-2 py-1 rounded-md bg-brand-dark/5 dark:bg-white/5 text-[10px] uppercase tracking-widest opacity-50 font-medium">
                          {categories.find(c => c.id === item.category_id)?.name || 'Uncategorized'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl hover:bg-brand-dark hover:text-white dark:hover:bg-brand-light dark:hover:text-brand-dark transition-all group"
                      title="Edit Item"
                    >
                      <Edit2 size={18} className="transition-transform group-hover:scale-110"/>
                    </button>
                    <button 
                      onClick={() => handleDelete(activeTab, item.id)} 
                      className="p-3 bg-red-50 dark:bg-red-500/5 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-red-500/80 group"
                      title="Delete Item"
                    >
                      <Trash2 size={18} className="transition-transform group-hover:scale-110"/>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Responsive Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#0a0a0a] p-6 sm:p-10 md:p-12 rounded-[2rem] max-w-2xl w-full shadow-2xl border border-white/5 max-h-[95vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 sm:mb-10">
              <h3 className="text-2xl sm:text-3xl font-serif italic text-brand-dark dark:text-brand-light">
                {editingId ? 'Edit' : 'New'} {activeTab.slice(0, -1)}
              </h3>
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }} 
                className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block opacity-40">Item Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-brand-dark/10 dark:border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors font-light text-xl"
                    value={newItem.name}
                    onChange={e => setNewItem({...newItem, name: e.target.value})}
                    required
                  />
                </div>

                {activeTab === 'products' && (
                  <>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block opacity-40">Price (₹)</label>
                      <input 
                        type="number" 
                        className="w-full bg-transparent border-b border-brand-dark/10 dark:border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors font-serif text-xl"
                        value={newItem.price}
                        onChange={e => setNewItem({...newItem, price: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block opacity-40">Category</label>
                      <select 
                        className="w-full bg-transparent border-b border-brand-dark/10 dark:border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors font-light appearance-none text-base"
                        value={newItem.category_id}
                        onChange={e => setNewItem({...newItem, category_id: e.target.value, new_category_name: ''})}
                      >
                        <option value="">Existing Category...</option>
                        {categories.map(c => <option key={c.id} value={c.id} className="dark:bg-[#0a0a0a]">{c.name}</option>)}
                      </select>
                    </div>

                    {!editingId && (
                      <div className="md:col-span-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block opacity-40">Create New Category?</label>
                        <input 
                          type="text" 
                          placeholder="Type a new category name..."
                          className="w-full bg-transparent border-b border-brand-dark/10 dark:border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors font-light italic"
                          value={newItem.new_category_name}
                          onChange={e => setNewItem({...newItem, new_category_name: e.target.value, category_id: ''})}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block opacity-40">Short Description</label>
                  <textarea 
                    className="w-full bg-transparent border-b border-brand-dark/10 dark:border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors font-light min-h-[80px]"
                    value={newItem.description}
                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block opacity-40">Media Asset</label>
                  <div className="mt-3 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <div className="w-28 h-28 rounded-3xl bg-gray-50 dark:bg-white/5 border-2 border-dashed border-brand-dark/10 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
                      {newItem.image_url ? (
                        <img src={newItem.image_url} className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="text-brand-dark/10 dark:text-white/10" size={32} />
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" />
                      <label 
                        htmlFor="file-upload"
                        className="inline-block bg-brand-dark text-white dark:bg-white dark:text-brand-dark px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:scale-105 transition-all shadow-lg active:scale-95"
                      >
                        {uploading ? 'Uploading...' : editingId ? 'Replace Photo' : 'Upload Asset'}
                      </label>
                      <p className="text-[10px] mt-3 opacity-30 italic font-medium">Resolution: Best with aspect ratio 4:5</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 sm:pt-10">
                <button 
                  type="submit" 
                  disabled={loading || uploading || (activeTab === 'products' && !newItem.category_id && !newItem.new_category_name)}
                  className="w-full bg-brand-dark text-white dark:bg-brand-light dark:text-brand-dark py-5 rounded-3xl font-serif text-xl italic hover:shadow-2xl hover:shadow-brand-accent/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-30 disabled:grayscale"
                >
                  {loading ? 'Processing...' : <span>{editingId ? 'Save Changes' : 'Confirm & Publish'}</span>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
