import axios from 'axios';
import { CustomerInfo, Order } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

interface OrderItemInput {
  product_id: number;
  quantity: number;
  price: number;
}

// 1. Enviar un nuevo pedido
export const sendOrder = async (
  customerInfo: CustomerInfo,
  items: OrderItemInput[]
): Promise<void> => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const payload = {
    name: customerInfo.name,
    phone: customerInfo.phone,
    address: customerInfo.address,
    paymentMethod: customerInfo.paymentMethod,
    total: Math.round(total),
    items
  };

  await axios.post(`${API_URL}/api/orders`, payload);
};

// 2. Obtener todos los pedidos (para el panel del administrador)
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/api/orders`);
  return response.data;
};

// 3. Actualizar el estado de un pedido
export const updateOrderStatus = async (
  orderId: string,
  newStatus: Order['status']
): Promise<void> => {
  await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status: newStatus });
};
