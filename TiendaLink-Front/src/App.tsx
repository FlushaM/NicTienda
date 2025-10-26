// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';

import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/auth/Login';
import AnnouncementBar from './components/AnnouncementBar';
import HomeSections from './components/HomeSections';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationSection from './components/LocationSection'; 

import { CartItem } from './types';

function App() {
  const { user } = useAuth();

  const [sections, setSections] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const baseURL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // 1) Traer secciones (ya vienen ordenadas por `position` del backend)
      const sectionsRes = await axios.get(`${baseURL}/api/sections`);
      setSections(sectionsRes.data);

      // 2) Traer categorías
      const categoriesRes = await axios.get(`${baseURL}/api/categories`);
      setCategories(categoriesRes.data);

      // 3) Traer anuncios (si sigues usando /api/home para ello)
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
            <Navbar />
            <HomeSections
              sections={sections}
              categories={categories}
              addToCart={() => {}} // aún requerido por HomeSections, pero vacío
            />
            <LocationSection />
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
