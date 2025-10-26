import React from 'react';
import { Section } from '../../../../types';
import { Edit, Trash, Layout, Grid } from 'lucide-react';

interface SectionListProps {
  sections: Section[];
  onCreateSection: () => void;
  onEdit: (section: Section) => void;
  onDelete: (id: string) => void;
  onViewProducts: (sectionId: string) => void;
  onViewOffers: (sectionId: string) => void;
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  onCreateSection,
  onEdit,
  onDelete,
  onViewProducts,
  onViewOffers
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Secciones</h2>
        <button
          onClick={onCreateSection}
          className="text-blue-500 hover:text-blue-700 text-2xl font-bold"
          title="Nueva sección"
        >
          +
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100"
          >
            <div className="flex items-center space-x-4">
              {section.type === 'category' ? (
                <Grid className="w-5 h-5 text-gray-500" />
              ) : (
                <Layout className="w-5 h-5 text-gray-500" />
              )}
              <div>
                <h3 className="font-medium">{section.title}</h3>
                <p className="text-sm text-gray-600">
                  {section.type === 'category'
                    ? 'Categorías'
                    : section.type === 'products'
                    ? 'Productos'
                    : 'Ofertas'}{' '}
                  - {section.layout}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {section.type === 'products' && (
                <button
                  onClick={() => onViewProducts(section.id)}
                  className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded"
                >
                  Ver Productos
                </button>
              )}
              {section.type === 'offers' && (
                <button
                  onClick={() => onViewOffers(section.id)}
                  className="px-3 py-1 text-sm text-green-500 hover:bg-green-50 rounded"
                >
                  Ver Ofertas
                </button>
              )}
              <button
                onClick={() => onEdit(section)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(section.id)}
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

export default SectionList;
