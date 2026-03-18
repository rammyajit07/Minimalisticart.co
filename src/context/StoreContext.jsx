import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('*');
      
      const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select('*');

      if (catError) throw catError;
      if (prodError) throw prodError;

      setCategories(catData || []);
      setProducts(prodData || []);
    } catch (err) {
      console.error('Error fetching data from Supabase:', err.message);
    } finally {
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
