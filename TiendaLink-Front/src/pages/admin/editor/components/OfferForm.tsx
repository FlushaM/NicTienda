// src/pages/admin/editor/components/OfferForm.tsx
import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Offer } from '../../../../types';

interface OfferFormProps {
  offer: Offer | null;
  isEditing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  triggerFileInput: () => void;
  handleImageUpload: (file: File) => void;
  onChange: (o: Offer) => void;
  onSave: () => void;
}

const OfferForm: React.FC<OfferFormProps> = ({
  offer,
  isEditing,
  fileInputRef,
  triggerFileInput,
  handleImageUpload,
  onChange,
  onSave
}) => {
  if (!offer) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">
        {isEditing ? 'Editar Oferta' : 'Nueva Oferta'}
      </h2>
      <form
        className="space-y-4"
        onSubmit={e => { e.preventDefault(); onSave(); }}
      >
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={offer.title}
            onChange={e => onChange({ ...offer, title: e.target.value })}
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={offer.image}
              onChange={e => onChange({ ...offer, image: e.target.value })}
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
              style={{ display: 'none' }}
              onChange={e => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        {/* Tamaño */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tamaño</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={offer.size}
            onChange={e => onChange({ ...offer, size: e.target.value as Offer['size'] })}
          >
            <option value="small">Pequeño (500×500 px) </option>
            <option value="medium">Mediano (1000×500 px)</option>
            <option value="large">Grande (1500×1000 px)</option>
            <option value="xl">Extra grande (3000×500 px)</option>
          </select>
        </div>

        {/* Enlace */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Enlace</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={offer.link}
            onChange={e => onChange({ ...offer, link: e.target.value })}
          />
        </div>

        {/* Activo */}
        <div className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-green-500 focus:ring-green-500"
            checked={offer.isActive}
            onChange={e => onChange({ ...offer, isActive: e.target.checked })}
          />
          <label className="ml-2 text-sm text-gray-700">Activo</label>
        </div>

        <button
          type="submit"
          className="btn-green w-full"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Oferta'}
        </button>
      </form>
    </div>
  );
};

export default OfferForm;
