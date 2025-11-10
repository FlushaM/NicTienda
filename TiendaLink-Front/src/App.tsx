import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext';

import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/auth/Login';
import Shop from './pages/shop/Shop';
import AnnouncementBar from './components/AnnouncementBar';
import HomeSections from './components/HomeSections';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationSection from './components/LocationSection';
import Cart from './pages/cart/Cart';
import HeroBannerCarousel from './components/HeroBannerCarousel';
import VideoSection from './components/VideoSection';

function App() {
  const { user } = useAuth();
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const [sections, setSections] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const sectionsRes = await axios.get(`${baseURL}/api/sections`);
      setSections(sectionsRes.data);

      const categoriesRes = await axios.get(`${baseURL}/api/categories`);
      setCategories(categoriesRes.data);

      const homeRes = await axios.get(`${baseURL}/api/home`);
      setAnnouncements(homeRes.data.announcements || []);
    } catch (error) {
      console.error('Error al obtener datos del home:', error);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/*"
        element={
          user?.role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50 relative">
            <AnnouncementBar announcements={announcements} />
            <Navbar onCartClick={() => setIsCartOpen(true)} />
            <HeroBannerCarousel />
            <HomeSections
              sections={sections}
              categories={categories}
              addToCart={() => {}}
            />
            <VideoSection />
            <LocationSection />
            <Footer />
            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              items={items}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onClearCart={clearCart}
            />
          </div>
        }
      />

      <Route
        path="/tienda"
        element={
          <div className="min-h-screen bg-gray-50 relative">
            <AnnouncementBar announcements={announcements} />
            <Navbar onCartClick={() => setIsCartOpen(true)} />
            <Shop />
            <Footer />
            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              items={items}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onClearCart={clearCart}
            />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
