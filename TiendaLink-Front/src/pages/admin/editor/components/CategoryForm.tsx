// src/pages/admin/editor/components/CategoryForm.tsx
import React from 'react';
import { Category } from '../../../../types';

interface Props {
  selectedCategory: Category | null;
  setSelectedCategory: (cat: Category | null) => void;
  isEditing: boolean;
  handleSaveCategory: (category: Category) => void;
}

const CategoryForm: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  isEditing,
  handleSaveCategory,
}) => {
  if (!selectedCategory) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">
        {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedCategory.title}
            onChange={(e) =>
              setSelectedCategory(prev => prev ? { ...prev, title: e.target.value } : null)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedCategory.description || ''}
            onChange={(e) =>
              setSelectedCategory(prev => prev ? { ...prev, description: e.target.value } : null)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedCategory.image || ''}
            onChange={(e) =>
              setSelectedCategory(prev => prev ? { ...prev, image: e.target.value } : null)
            }
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            checked={selectedCategory.isActive}
            onChange={(e) =>
              setSelectedCategory((prev: any) => prev ? { ...prev, isActive: e.target.checked } : null)
            }
          />
          <label className="ml-2 text-sm text-gray-700">Activo</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={(e) => {
            e.preventDefault();
            if (selectedCategory) handleSaveCategory(selectedCategory);
          }}
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
