// src/pages/admin/editor/PageEditor.tsx

import React from 'react';
import { Trash } from 'lucide-react';
import { usePageEditor } from './usePageEditor';

import SectionList from './components/SectionList';
import SectionForm from './components/SectionForm';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import OfferList from './components/OfferList';
import OfferForm from './components/OfferForm';
import CategoryItemList from './components/CategoryItemList';
import CategoryItemForm from './components/CategoryItemForm';

const PageEditor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    // Datos
    sections,
    categories,
    products,
    offers,
    categoryItems,

    // Selecciones
    selectedSection,
    setSelectedSection,
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct,
    selectedOffer,
    setSelectedOffer,
    selectedCategoryItem,
    setSelectedCategoryItem,

    // UI / pestañas
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    currentSectionId,
    setCurrentSectionId,
    currentCategoryId,
    setCurrentCategoryId,

    // Imagenes
    fileInputRef,
    triggerFileInput,
    handleImageUpload,

    // Acciones CRUD
    handleSaveSection,
    handleDeleteSection,
    handleSaveCategory,
    handleDeleteCategory,
    handleSaveProduct,
    handleDeleteProduct,
    handleSaveOffer,
    handleDeleteOffer,
    handleSaveCategoryItem,
    handleDeleteCategoryItem,
  } = usePageEditor();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
          <Trash className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Editor de Página</h2>
      </div>

      {/* TABS NAV */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['sections', 'categories', 'products', 'offers', 'categoryItems'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
                setCurrentSectionId(null);
                setCurrentCategoryId(null);
              }}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab === 'sections'
                ? 'Secciones'
                : tab === 'categories'
                ? 'Categorías'
                : tab === 'products'
                ? 'Productos'
                : tab === 'offers'
                ? 'Ofertas'
                : 'Ítems'}
            </button>
          ))}
        </nav>
      </div>

      {/* CONTENT */}

      {/* Secciones */}
      {activeTab === 'sections' && (
        <div className="grid md:grid-cols-2 gap-8">
          <SectionList
            sections={sections}
            onCreateSection={() => {
              setSelectedSection({
                id: '',
                title: '',
                type: 'category',
                layout: 'grid',
                isActive: true,
              });
              setIsEditing(false);
            }}
            onViewProducts={id => {
              setActiveTab('products');
              setCurrentSectionId(id);
            }}
            onViewOffers={id => {
              setActiveTab('offers');
              setCurrentSectionId(id);
            }}
            onEdit={sec => {
              setSelectedSection(sec);
              setIsEditing(true);
            }}
            onDelete={handleDeleteSection}
          />
          {(selectedSection || !isEditing) && (
            <SectionForm
              section={selectedSection}
              isEditing={isEditing}
              onChange={sec => setSelectedSection(sec)}
              onSave={() =>
                selectedSection && handleSaveSection(selectedSection)
              }
            />
          )}
        </div>
      )}

      {/* Categorías */}
      {activeTab === 'categories' && (
        <div className="grid md:grid-cols-2 gap-8">
          <CategoryList
            categories={categories}
            onCreate={() => {
              setSelectedCategory({
                id: '',
                title: '',
                description: '',
                image: '',
                isActive: true,
              });
              setIsEditing(false);
            }}
            onEdit={cat => {
              setSelectedCategory(cat);
              setIsEditing(true);
            }}
            onDelete={handleDeleteCategory}
          />
          {(selectedCategory || !isEditing) && (
            <CategoryForm
              selectedCategory={selectedCategory}
              isEditing={isEditing}
              setSelectedCategory={setSelectedCategory}
              onSave={handleSaveCategory}
            />
          )}
        </div>
      )}

      {/* Productos */}
      {activeTab === 'products' && (
        <div className="grid md:grid-cols-2 gap-8">
          <ProductList
            products={products}
            sections={sections}
            currentSectionId={currentSectionId}
            onEdit={p => {
              setSelectedProduct(p);
              setIsEditing(true);
            }}
            onDelete={handleDeleteProduct}
            clearFilter={() => setCurrentSectionId(null)}
            onCreate={() => {
                 setSelectedProduct({
                   id: '',
                   title: '',
                 description: '',
                   price: '',
                  discount: '',
                   image: '',
                   category_id: '',
                   section_id: currentSectionId || '',
                   featured: false,
                   size: 'small'
                });
                 setIsEditing(false);
               }}
          />
          {(selectedProduct || !isEditing) && (
            <ProductForm
              product={selectedProduct}
              isEditing={isEditing}
              categories={categories}
              sections={sections}
              fileInputRef={fileInputRef}
              triggerFileInput={triggerFileInput}
              handleImageUpload={handleImageUpload}
              onChange={upd =>
                setSelectedProduct(prev => (prev ? { ...prev, ...upd } : prev))
              }
              onSubmit={() =>
                selectedProduct && handleSaveProduct(selectedProduct)
              }
            />
          )}
        </div>
      )}

      {/* Ofertas */}
      {activeTab === 'offers' && (
  <div className="grid md:grid-cols-2 gap-8">
    <OfferList
      offers={offers}
      currentSectionId={currentSectionId}
      onCreate={() => {
        setSelectedOffer({
          id: '',
          title: '',
          image: '',
          link: '',
          isActive: true,
          section_id: currentSectionId!,
          size: 'medium'        // ← default
        });
        setIsEditing(false);
      }}
      onEdit={o => { setSelectedOffer(o); setIsEditing(true); }}
      onDelete={handleDeleteOffer}
    />

    {(selectedOffer || !isEditing) && (
      <OfferForm
        offer={selectedOffer}
        isEditing={isEditing}

        // ← estas son imprescindibles para que funcione el file picker
        fileInputRef={fileInputRef}
        triggerFileInput={triggerFileInput}
        handleImageUpload={handleImageUpload}

        onChange={o => setSelectedOffer(o)}
        onSave={() => selectedOffer && handleSaveOffer(selectedOffer)}
      />
    )}
  </div>
)}
      {/* Ítems de Categoría */}
      {activeTab === 'categoryItems' && (
        <div className="grid md:grid-cols-2 gap-8">
          <CategoryItemList
            items={categoryItems}
            currentCategoryId={currentCategoryId}
            onCreate={() => {
              setSelectedCategoryItem({
                id: '',
                title: '',
                image: '',
                category_id: currentCategoryId!,
              });
              setIsEditing(false);
            }}
            onEdit={it => {
              setSelectedCategoryItem(it);
              setIsEditing(true);
            }}
            onDelete={handleDeleteCategoryItem}
          />
          {(selectedCategoryItem || !isEditing) && (
            <CategoryItemForm
              selectedItem={selectedCategoryItem}
              isEditing={isEditing}
              onChange={ci => setSelectedCategoryItem(ci)}
              onSave={handleSaveCategoryItem}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PageEditor;
