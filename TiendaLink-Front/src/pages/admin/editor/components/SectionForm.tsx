import React from 'react';
import { Section } from '../../../../types';

interface SectionFormProps {
  section: Section | null;
  isEditing: boolean;
  onChange: (section: Section) => void;
  onSave: () => void;
}

const SectionForm: React.FC<SectionFormProps> = ({ section, isEditing, onChange, onSave }) => {
  if (!section) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">
        {isEditing ? 'Editar Sección' : 'Nueva Sección'}
      </h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={section.type}
            onChange={(e) =>
              onChange({ ...section, type: e.target.value as Section['type'] })
            }
          >
            <option value="category">Categorías</option>
            <option value="products">Productos</option>
            <option value="offers">Ofertas</option>
          </select>
        </div>

        {/* Diseño */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Diseño</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={section.layout}
            onChange={(e) =>
              onChange({ ...section, layout: e.target.value as Section['layout'] })
            }
          >
            <option value="grid">Cuadrícula</option>
            <option value="carousel">Carrusel</option>
            <option value="featured">Destacado</option>
          </select>
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-700">Orden</label>
  <input
    type="number"
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
    value={section.position}
    onChange={e => onChange({ ...section, position: parseInt(e.target.value, 10) })}
  />
</div>
        {/* Activo */}
        <div className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            checked={section.isActive}
            onChange={(e) => onChange({ ...section, isActive: e.target.checked })}
          />
          <label className="ml-2 text-sm text-gray-700">Activo</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Sección'}
        </button>
      </form>
    </div>
  );
};

export default SectionForm;
