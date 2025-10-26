import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Product, Category, Section } from '../../../../types';

interface ProductFormProps {
  product: Product | null;
  isEditing: boolean;
  categories: Category[];
  sections: Section[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  triggerFileInput: () => void;
  handleImageUpload: (file: File) => void;
  onChange: (p: Partial<Product>) => void;
  onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isEditing,
  categories,
  sections,
  fileInputRef,
  triggerFileInput,
  handleImageUpload,
  onChange,
  onSubmit,
}) => {
  if (!product) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">
        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
      </h2>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            className="input"
            value={product.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            className="input"
            value={product.description}
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </div>

        {/* Precio y Descuento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="text"
              className="input"
              value={product.price}
              onChange={(e) => onChange({ price: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descuento</label>
            <input
              type="text"
              className="input"
              value={product.discount}
              onChange={(e) => onChange({ discount: e.target.value })}
            />
          </div>
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input"
              value={product.image}
              onChange={(e) => onChange({ image: e.target.value })}
            />
            <button
              type="button"
              className="btn-green"
              onClick={triggerFileInput}
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        {/* Categoría y Sección */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            className="input"
            value={product.category_id}
            onChange={(e) => onChange({ category_id: e.target.value })}
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sección</label>
          <select
            className="input"
            value={product.section_id}
            onChange={(e) => onChange({ section_id: e.target.value })}
          >
            <option value="">Sin sección</option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        {/* Tamaño */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tamaño</label>
          <select
            className="input"
            value={product.size}
            onChange={(e) => onChange({ size: e.target.value as any })}
          >
            <option value="small">Pequeño (500×500 px) </option>
            <option value="medium">Mediano (1000×500 px)</option>
            <option value="large">Grande (1500×1000 px)</option>
            <option value="xl">Extra grande (3000×500 px)</option>
          </select>
        </div>

        {/* Destacado */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={product.featured}
            onChange={(e) => onChange({ featured: e.target.checked })}
          />
          <label className="ml-2 text-sm text-gray-700">Destacado</label>
        </div>

        <button type="submit" className="btn-blue w-full">
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
