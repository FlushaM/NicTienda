// src/pages/admin/editor/components/ProductList.tsx

import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { Product, Section } from '../../../../types';

interface ProductListProps {
  products: Product[];
  sections: Section[];
  currentSectionId: string | null;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  clearFilter: () => void;
  onCreate: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  sections,
  currentSectionId,
  onEdit,
  onDelete,
  clearFilter,
  onCreate
}) => {
  const list = currentSectionId
    ? products.filter(p => p.section_id === currentSectionId)
    : products;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {currentSectionId && (
            <button
              onClick={clearFilter}
              className="text-gray-500 p-1 hover:bg-gray-100 rounded"
            >
              <Trash />
            </button>
          )}
          <h2 className="text-xl font-bold">
            {currentSectionId
              ? `Productos en ${sections.find(s => s.id === currentSectionId)?.title}`
              : 'Productos'}
          </h2>
        </div>
        <button
          onClick={onCreate}
          className="text-green-500 hover:text-green-700 text-2xl font-bold"
          title="Nuevo Producto"
        >
          +
        </button>
      </div>
      <div className="space-y-4">
        {list.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-sm text-gray-600">
                  {p.price} — {p.size}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(p)} className="text-blue-500 p-1 hover:bg-blue-50 rounded">
                <Edit />
              </button>
              <button onClick={() => onDelete(p.id)} className="text-red-500 p-1 hover:bg-red-50 rounded">
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
