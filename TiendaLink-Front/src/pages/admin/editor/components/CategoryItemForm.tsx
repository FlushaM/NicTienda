// src/pages/admin/editor/components/CategoryItemForm.tsx
import React from 'react';
import { CategoryItem } from '../../../../types';

interface CategoryItemFormProps {
  selectedItem: CategoryItem | null;
  isEditing: boolean;
  onChange: (ci: CategoryItem) => void;
  onSave: (ci: CategoryItem) => void;
}

const CategoryItemForm: React.FC<CategoryItemFormProps> = ({
  selectedItem,
  isEditing,
  onChange,
  onSave
}) => {
  if (!selectedItem) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? 'Editar Ítem' : 'Nuevo Ítem'}
      </h2>
      <form onSubmit={e => { e.preventDefault(); onSave(selectedItem); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Título</label>
          <input
            type="text"
            className="input"
            value={selectedItem.title}
            onChange={e => onChange({ ...selectedItem, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">URL de Imagen</label>
          <input
            type="text"
            className="input"
            value={selectedItem.image}
            onChange={e => onChange({ ...selectedItem, image: e.target.value })}
          />
        </div>
        <button type="submit" className="btn-blue w-full">
          {isEditing ? 'Guardar Cambios' : 'Crear Ítem'}
        </button>
      </form>
    </div>
  );
};

export default CategoryItemForm;
