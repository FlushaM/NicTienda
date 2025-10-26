import React, { useEffect, useState } from 'react';
import { Order, OrderStats } from '../../../types';
import { Clock, CheckCircle, DollarSign, XCircle, BarChart2 } from 'lucide-react';
import { fetchOrders, updateOrderStatus } from '../../../services/orderService';

interface OrdersManagementProps {
  onBack: () => void;
}

const OrdersManagement: React.FC<OrdersManagementProps> = ({ onBack }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [view, setView] = useState<'list' | 'stats'>('list');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'in_progress':
        return 'text-blue-500';
      case 'paid':
        return 'text-green-500';
      case 'completed':
        return 'text-green-700';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const computeStats = (): OrderStats => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    return { totalOrders, completedOrders, totalRevenue, averageOrderValue };
  };

  const stats = computeStats();

  const renderStats = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Pedidos</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pedidos Completados</p>
              <p className="text-2xl font-bold">{stats.completedOrders}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ingresos Totales</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString('es-CL')}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-700" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Valor Promedio</p>
              <p className="text-2xl font-bold">${stats.averageOrderValue.toLocaleString('es-CL')}</p>
            </div>
            <BarChart2 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersList = () => (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Pedido #{order.id}</h3>
                <span className={`text-sm ${getStatusColor(order.status)}`}>
                  • {order.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-600">{order.customerInfo.name}</p>
              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('es-CL')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSelectedOrder(order)} className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded">
                Ver Detalles
              </button>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
              </p>
              <p className="font-medium">${order.total.toLocaleString('es-CL')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOrderDetails = (order: Order) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Detalles del Pedido #{order.id}</h3>
        <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
          <XCircle className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Información del Cliente</h4>
          <div className="bg-gray-50 p-4 rounded">
            <p><span className="font-medium">Nombre:</span> {order.customerInfo.name}</p>
            <p><span className="font-medium">Teléfono:</span> {order.customerInfo.phone}</p>
            <p><span className="font-medium">Dirección:</span> {order.customerInfo.address}</p>
            <p>
              <span className="font-medium">Método de Pago:</span>
              {order.customerInfo.paymentMethod === 'transfer' ? 'Transferencia' : 'Efectivo'}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Productos</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="bg-gray-50 p-4 rounded flex justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.price} (-{item.discount} OFF) x {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  ${(parseFloat(item.price.replace('$', '').replace('.', '')) *
                    (1 - parseInt(item.discount) / 100) *
                    item.quantity).toLocaleString('es-CL')}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Estado actual</p>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
            >
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="paid">Pagado</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total del Pedido</p>
            <p className="text-2xl font-bold">${order.total.toLocaleString('es-CL')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            <XCircle className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Pedidos
          </button>
          <button
            onClick={() => setView('stats')}
            className={`px-4 py-2 rounded-lg ${view === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Estadísticas
          </button>
        </div>
      </div>
      {selectedOrder ? renderOrderDetails(selectedOrder) : (view === 'stats' ? renderStats() : renderOrdersList())}
    </div>
  );
};

export default OrdersManagement;
