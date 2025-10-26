import React from 'react';
import { LayoutGrid, ShoppingBag, Settings, BarChart2 } from 'lucide-react';

interface DashboardHomeProps {
  onNavigate: (view: string) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const features = [
    {
      title: 'Editar Página',
      description: 'Gestiona las secciones, categorías y productos de tu tienda',
      icon: <LayoutGrid className="w-8 h-8" />,
      action: () => onNavigate('edit')
    },
    {
      title: 'Gestionar Pedidos',
      description: 'Revisa y actualiza el estado de los pedidos recibidos',
      icon: <ShoppingBag className="w-8 h-8" />,
      action: () => onNavigate('orders')
    },
    {
      title: 'Estadísticas',
      description: 'Visualiza métricas y análisis de ventas',
      icon: <BarChart2 className="w-8 h-8" />,
      action: () => onNavigate('stats')
    },
    {
      title: 'Configuración',
      description: 'Ajusta la configuración general de la tienda',
      icon: <Settings className="w-8 h-8" />,
      action: () => onNavigate('settings')
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Bienvenido al Panel de Administración</h2>
        <p className="text-gray-600">
          Gestiona tu tienda y mantén todo bajo control desde un solo lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <button
            key={feature.title}
            onClick={feature.action}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-start gap-4">
              <div className="text-blue-500">{feature.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-gray-600 mt-1">{feature.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-gray-600">Nuevo pedido recibido hace 5 minutos</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <p className="text-gray-600">Producto "Lácteos Premium" actualizado hace 1 hora</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <p className="text-gray-600">3 pedidos pendientes requieren atención</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;