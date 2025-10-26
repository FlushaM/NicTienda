import React, { useState } from 'react';
import { X, Plus, Minus, Send } from 'lucide-react';
import { CartItem, CustomerInfo } from '../../types';
import { sendOrder } from '../../services/orderService';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity
}) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'transfer'
  });

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');

  const total = Math.round(
    items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '').replace('.', '').replace(',', '.'));
      const discount = parseInt(item.discount);
      const discountedPrice = price * (1 - discount / 100);
      return sum + discountedPrice * item.quantity;
    }, 0)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const orderItems = items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: parseFloat(item.price.replace('$', '').replace('.', '').replace(',', '.'))
      }));

      await sendOrder(customerInfo, orderItems); // ✅

      alert('✅ Pedido enviado con éxito');
      setCustomerInfo({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'transfer'
      });
      setStep('cart');
      onClose();
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      alert('❌ Hubo un problema al enviar el pedido');
    }
  };

  const renderCartItems = () => (
    <div className="flex-1 overflow-y-auto">
      {items.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">Tu carrito está vacío</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.price} (-{item.discount} OFF)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1 hover:bg-red-100 text-red-500 rounded ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCheckoutForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={customerInfo.phone}
          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dirección</label>
        <textarea
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={customerInfo.address}
          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={customerInfo.paymentMethod}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value as 'transfer' | 'cash' })
          }
        >
          <option value="transfer">Transferencia</option>
          <option value="cash">Efectivo</option>
        </select>
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Total a Pagar:</span>
          <span className="font-bold">${total.toLocaleString('es-CL')}</span>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Enviar Pedido
        </button>
      </div>
    </form>
  );

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {step === 'cart' ? 'Carrito de Compras' : 'Finalizar Compra'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'cart' ? (
          <>
            {renderCartItems()}
            {items.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total Estimado:</span>
                  <span className="font-bold">${total.toLocaleString('es-CL')}</span>
                </div>
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  Continuar
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 overflow-y-auto">{renderCheckoutForm()}</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
