// src/pages/admin/editor/usePageEditor.ts

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Product, Category, Section, CategoryItem, Offer } from '../../../types';

const baseURL = import.meta.env.VITE_API_URL || '';

export const usePageEditor = () => {
  // Datos
  const [sections, setSections] = useState<Section[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);

  // Selecciones
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<CategoryItem | null>(null);

  // UI / estado
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sections' | 'categories' | 'products' | 'offers' | 'categoryItems'>('sections');
  const [isEditing, setIsEditing] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch inicial
  const fetchSections = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/sections`);
      setSections(res.data);
    } catch (error) {
      console.error('Error al obtener secciones:', error);
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/offers`);
      setOffers(res.data);
    } catch (error) {
      console.error('Error al obtener ofertas:', error);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };
  const fetchCategoryItems = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/category-items`);
      setCategoryItems(res.data);
    } catch (error) {
      console.error('Error al obtener ítems de categoría:', error);
    }
  };

  useEffect(() => {
    fetchSections();
    fetchProducts();
    fetchOffers();
    fetchCategories();
    fetchCategoryItems();
  }, []);

  // Upload imagen
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const uploadRes = await axios.post(`${baseURL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const url = uploadRes.data.url;
      if (selectedProduct) setSelectedProduct({ ...selectedProduct, image: url });
      if (selectedOffer) setSelectedOffer({ ...selectedOffer, image: url });
      if (selectedCategoryItem) setSelectedCategoryItem({ ...selectedCategoryItem, image: url });
    } catch (err) {
      console.error('Error al subir imagen:', err);
      alert('Error al subir imagen');
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // CRUD Secciones (reordena tras guardar)
  const handleSaveSection = async (section: Section) => {
    try {
      let updated: Section;
      if (isEditing && section.id) {
        const res = await axios.put(`${baseURL}/api/sections/${section.id}`, section);
        updated = res.data;
        setSections(sections
          .map(s => s.id === updated.id ? updated : s)
          .sort((a,b) => a.position - b.position)
        );
      } else {
        const res = await axios.post(`${baseURL}/api/sections`, section);
        updated = res.data;
        setSections([...sections, updated].sort((a,b) => a.position - b.position));
      }
      setIsEditing(false);
      setSelectedSection(null);
    } catch (err) {
      console.error('Error al guardar sección:', err);
    }
  };
  const handleDeleteSection = async (id: string) => {
    try {
      await axios.delete(`${baseURL}/api/sections/${id}`);
      setSections(sections.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error al eliminar sección:', err);
    }
  };

  // CRUD Productos
  const handleSaveProduct = async (product: Product) => {
    try {
      if (isEditing && product.id) {
        const res = await axios.put(`${baseURL}/api/products/${product.id}`, product);
        setProducts(products.map(p => p.id === product.id ? res.data : p));
      } else {
        const res = await axios.post(`${baseURL}/api/products`, product);
        setProducts([...products, res.data]);
      }
      setIsEditing(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error al guardar producto:', err);
    }
  };
  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`${baseURL}/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert('No se puede eliminar: producto en pedidos');
      } else {
        alert('Error al eliminar producto');
      }
    }
  };

  // CRUD Ofertas
  const handleSaveOffer = async (offer: Offer) => {
    try {
      if (isEditing && offer.id) {
        const res = await axios.put(`${baseURL}/api/offers/${offer.id}`, offer);
        setOffers(offers.map(o => o.id === offer.id ? res.data : o));
      } else {
        const res = await axios.post(`${baseURL}/api/offers`, offer);
        setOffers([...offers, res.data]);
      }
      setIsEditing(false);
      setSelectedOffer(null);
    } catch (err) {
      console.error('Error al guardar oferta:', err);
    }
  };
  const handleDeleteOffer = async (id: string) => {
    try {
      await axios.delete(`${baseURL}/api/offers/${id}`);
      setOffers(offers.filter(o => o.id !== id));
    } catch (err) {
      console.error('Error al eliminar oferta:', err);
    }
  };

  // CRUD Categorías
  const handleSaveCategory = async (cat: Category) => {
    try {
      if (isEditing && cat.id) {
        const res = await axios.put(`${baseURL}/api/categories/${cat.id}`, cat);
        setCategories(categories.map(c => c.id === cat.id ? res.data : c));
      } else {
        const res = await axios.post(`${baseURL}/api/categories`, cat);
        setCategories([...categories, res.data]);
      }
      setIsEditing(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error('Error al guardar categoría:', err);
    }
  };
  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`${baseURL}/api/categories/${id}`);
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
    }
  };

  // CRUD CategoryItems
  const handleSaveCategoryItem = async (item: CategoryItem) => {
    try {
      if (isEditing && item.id) {
        const res = await axios.put(`${baseURL}/api/category-items/${item.id}`, item);
        setCategoryItems(categoryItems.map(ci => ci.id === item.id ? res.data : ci));
      } else {
        const res = await axios.post(`${baseURL}/api/category-items`, item);
        setCategoryItems([...categoryItems, res.data]);
      }
      setIsEditing(false);
      setSelectedCategoryItem(null);
    } catch (err) {
      console.error('Error al guardar ítem de categoría:', err);
    }
  };
  const handleDeleteCategoryItem = async (id: string | number) => {
    try {
      await axios.delete(`${baseURL}/api/category-items/${id}`);
      setCategoryItems(categoryItems.filter(ci => ci.id !== id));
    } catch (err) {
      console.error('Error al eliminar ítem de categoría:', err);
    }
  };

  return {
    // Datos
    sections,
    categories,
    products,
    offers,
    categoryItems,

    // Selecciones
    selectedSection,
    selectedProduct,
    selectedOffer,
    selectedCategory,
    selectedCategoryItem,

    // UI y IDs
    currentSectionId,
    currentCategoryId,
    activeTab,
    isEditing,

    // Setters
    setSections,
    setCategories,
    setProducts,
    setOffers,
    setCategoryItems,
    setSelectedSection,
    setSelectedProduct,
    setSelectedOffer,
    setSelectedCategory,
    setSelectedCategoryItem,
    setCurrentSectionId,
    setCurrentCategoryId,
    setActiveTab,
    setIsEditing,

    // Archivos
    fileInputRef,
    handleImageUpload,
    triggerFileInput,

    // CRUD
    handleSaveSection,
    handleDeleteSection,
    handleSaveProduct,
    handleDeleteProduct,
    handleSaveOffer,
    handleDeleteOffer,
    handleSaveCategory,
    handleDeleteCategory,
    handleSaveCategoryItem,
    handleDeleteCategoryItem,
  };
};
