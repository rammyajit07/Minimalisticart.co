import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const fetchData = async () => {
    // If we're already loading, don't trigger again
    // But for initial load, we want to let it run in background
    try {
      // Create a promise that rejects after 1.5 seconds
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 1500)
      );

      // Race the supabase requests against the timeout
      const [catRes, prodRes] = await Promise.race([
        Promise.all([
          supabase.from('categories').select('*'),
          supabase.from('products').select('*')
        ]),
        timeoutPromise
      ]);

      if (catRes.error) throw catRes.error;
      if (prodRes.error) throw prodRes.error;

      // Update with real data if it succeeds within timeout
      if (catRes.data) setCategories(catRes.data);
      if (prodRes.data) setProducts(prodRes.data);
    } catch (err) {
      console.error('Data sync failed:', err.message);
      // We don't need to do anything else here because 
      // the UI will just keep using the fallback/stale data
    } finally {
      // Always set loading to false after first attempt (success or fail or timeout)
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider value={{ 
      products, 
      categories, 
      loading, 
      fetchData, 
      activeFilter, 
      setActiveFilter 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
