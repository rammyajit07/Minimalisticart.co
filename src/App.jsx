import React, { useState, useEffect } from 'react';
import './index.css';
import { StoreProvider } from './context/StoreContext';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Gallery from './components/Gallery';
import FeaturedBenefits from './components/FeaturedBenefits';
import HowItWorks from './components/HowItWorks';
import Crafter from './components/Crafter';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  const [view, setView] = useState('home'); 
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setView('admin');
    }
  }, []);

  if (view === 'admin') {
    return (
      <StoreProvider>
        {!adminUser ? (
          <AdminLogin onLogin={setAdminUser} onBack={() => setView('home')} />
        ) : (
          <AdminDashboard user={adminUser} onLogout={() => {
            supabase.auth.signOut();
            setAdminUser(null);
            setView('home');
          }} />
        )}
      </StoreProvider>
    );
  }

  return (
    <StoreProvider>
      <div className="min-h-screen font-sans antialiased text-brand-dark bg-brand-light dark:bg-brand-dark dark:text-brand-light transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Categories />
          <Gallery />
          <FeaturedBenefits />
          <HowItWorks />
          <Crafter />
          <CTA />
        </main>
        <Footer onAdminClick={() => setView('admin')} />
      </div>
    </StoreProvider>
  );
}

export default App;
