import React, { useState } from 'react';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import Profile from './components/Profile';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import { CartProvider } from './context/CartContext';
import Auth0ProviderWithNavigate from './auth/auth0-provider';
import './App.css';

const AppContent = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0();

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar 
          isAuthenticated={isAuthenticated}
          username={user?.name || user?.email}
          onAuthClick={handleAuthClick}
        />
        <div className="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              {/* These routes remain available for direct navigation */}
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              {/* Redirect any unmatched routes to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {showAuthModal && (
            <AuthModal 
              onClose={() => setShowAuthModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </CartProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AppContent />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}

export default App;