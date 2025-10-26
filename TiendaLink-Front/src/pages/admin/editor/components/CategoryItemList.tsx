// src/pages/admin/editor/components/CategoryItemList.tsx
import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { CategoryItem } from '../../../../types';

interface CategoryItemListProps {
  items: CategoryItem[];
  currentCategoryId: string | null;
  onCreate: () => void;
  onEdit: (it: CategoryItem) => void;
  onDelete: (id: string) => void;
}

const CategoryItemList: React.FC<CategoryItemListProps> = ({
  items,
  currentCategoryId,
  onCreate,
  onEdit,
  onDelete
}) => {
  const list = items.filter(it => it.category_id === currentCategoryId);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Ítems de Categoría</h2>
        <button onClick={onCreate} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
          +
        </button>
      </div>
      <div className="space-y-4">
        {list.map(it => (
          <div
            key={it.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              {it.image && (
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              <span>{it.title}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(it)} className="text-blue-500 p-1 hover:bg-blue-50 rounded">
                <Edit />
              </button>
              <button onClick={() => onDelete(it.id)} className="text-red-500 p-1 hover:bg-red-50 rounded">
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItemList;
