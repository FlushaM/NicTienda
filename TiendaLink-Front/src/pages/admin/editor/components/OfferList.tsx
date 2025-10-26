import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { Offer } from '../../../../types';

interface OfferListProps {
  offers: Offer[];
  currentSectionId: string | null;
  onCreate: () => void;
  onEdit: (offer: Offer) => void;
  onDelete: (id: string) => void;
}

const OfferList: React.FC<OfferListProps> = ({
  offers,
  currentSectionId,
  onCreate,
  onEdit,
  onDelete
}) => {
  const list = currentSectionId
    ? offers.filter((o) => o.section_id === currentSectionId)
    : offers;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {currentSectionId
            ? `Ofertas en sección ${currentSectionId}`
            : 'Ofertas'}
        </h2>
        <button onClick={onCreate} className="text-green-500 hover:text-green-700 text-2xl font-bold">
          +
        </button>
      </div>
      <div className="space-y-4">
        {list.map((o) => (
          <div
            key={o.id}
            className="flex justify-between p-4 bg-gray-50 rounded hover:bg-gray-100"
          >
            <div>
              <h3 className="font-medium">{o.title}</h3>
              <a
                href={o.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-500 underline"
              >
                Ir al enlace
              </a>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(o)} className="text-blue-500 p-1 hover:bg-blue-50 rounded">
                <Edit />
              </button>
              <button onClick={() => onDelete(o.id)} className="text-red-500 p-1 hover:bg-red-50 rounded">
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferList;
