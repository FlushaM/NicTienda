import React from 'react';
import { Category } from '../../../../types';
import { Edit, Trash } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
  onCreate,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Lista de Categorías</h2>
        <button
          onClick={onCreate}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100"
          >
            <div className="flex items-center space-x-4">
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              <div>
                <h3 className="font-medium">{cat.title}</h3>
                {cat.description && (
                  <p className="text-sm text-gray-600">{cat.description}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(cat)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(cat.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
