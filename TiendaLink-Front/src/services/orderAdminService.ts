import axios from 'axios';
import { Order } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllOrders = async (): Promise<Order[]> => {
  const res = await axios.get(`${API_URL}/api/orders`);
  return res.data.map((order: any) => ({
    id: order.id.toString(),
    items: order.items.map((item: any) => ({
      id: item.product.id,
      title: item.product.title,
      price: item.price,
      discount: item.product.discount,
      quantity: item.quantity
    })),
    customerInfo: {
      name: order.customer_name,
      phone: order.customer_phone,
      address: order.address,
      paymentMethod: order.payment_method
    },
    total: order.items.reduce((sum: number, i: any) => {
      const discount = parseInt(i.product.discount || '0');
      const price = parseFloat(i.price);
      return sum + (price * i.quantity * (1 - discount / 100));
    }, 0),
    status: order.status,
    createdAt: order.created_at
  }));
};
