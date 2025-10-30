import React, { useState } from 'react';
import { X, Plus, Minus, Send, Trash2 } from 'lucide-react';
import { CartItem } from '../../types';

const WHATSAPP_NUMBER = '56938761485';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  onClearCart
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [step, setStep] = useState<'cart' | 'info'>('cart');

  const calculateItemTotal = (item: CartItem) => {
    const price = parseFloat(item.price.replace(/[$.]/g, ''));
    const discount = parseInt(item.discount) || 0;
    const discountedPrice = price * (1 - discount / 100);
    return discountedPrice * item.quantity;
  };

  const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const handleSendWhatsApp = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Por favor completa tu nombre y teléfono');
      return;
    }

    let message = `*COTIZACIÓN DE PRODUCTOS*\n\n`;
    message += `*Cliente:* ${customerInfo.name}\n`;
    message += `*Teléfono:* ${customerInfo.phone}\n`;
    if (customerInfo.address) {
      message += `*Dirección:* ${customerInfo.address}\n`;
    }
    message += `\n*PRODUCTOS:*\n\n`;

    items.forEach((item, index) => {
      const itemTotal = calculateItemTotal(item);
      message += `${index + 1}. *${item.title}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio unitario: $${parseFloat(item.price.replace(/[$.]/g, '')).toLocaleString('es-CL')}\n`;
      if (parseInt(item.discount) > 0) {
        message += `   Descuento: ${item.discount}%\n`;
      }
      message += `   Subtotal: $${itemTotal.toLocaleString('es-CL')}\n\n`;
    });

    message += `*TOTAL: $${total.toLocaleString('es-CL')}*\n\n`;
    message += `Espero su confirmación. ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    onClearCart();
    setCustomerInfo({ name: '', phone: '', address: '' });
    setStep('cart');
    onClose();
  };

  const renderCartItems = () => (
    <div className="flex-1 overflow-y-auto space-y-3">
      {items.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg font-medium">Tu carrito está vacío</p>
          <p className="text-sm mt-2">Agrega productos para continuar</p>
        </div>
      ) : (
        <>
          {items.map((item) => {
            const itemTotal = calculateItemTotal(item);
            return (
              <div
                key={item.id}
                className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-xl border border-purple-100 shadow-sm"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-purple-600 font-semibold mt-1">
                      ${parseFloat(item.price.replace(/[$.]/g, '')).toLocaleString('es-CL')}
                      {parseInt(item.discount) > 0 && (
                        <span className="ml-2 text-red-600">-{item.discount}%</span>
                      )}
                    </p>
                    <p className="text-sm font-bold text-purple-700 mt-1">
                      Subtotal: ${itemTotal.toLocaleString('es-CL')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-purple-200 p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1.5 hover:bg-purple-100 rounded transition"
                    >
                      <Minus className="w-4 h-4 text-purple-600" />
                    </button>
                    <span className="w-8 text-center font-bold text-purple-700">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-purple-100 rounded transition"
                    >
                      <Plus className="w-4 h-4 text-purple-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );

  const renderInfoForm = () => (
    <div className="space-y-4 flex-1 overflow-y-auto">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          required
          placeholder="Ingresa tu nombre"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Teléfono *
        </label>
        <input
          type="tel"
          required
          placeholder="+56 9 1234 5678"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
          value={customerInfo.phone}
          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Dirección (opcional)
        </label>
        <textarea
          rows={3}
          placeholder="Calle, número, comuna..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition resize-none"
          value={customerInfo.address}
          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-700">Total:</span>
            <span className="text-2xl font-bold text-purple-700">
              ${total.toLocaleString('es-CL')}
            </span>
          </div>
        </div>

        <button
          onClick={handleSendWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg"
        >
          <Send className="w-5 h-5" />
          Enviar Cotización por WhatsApp
        </button>

        <button
          onClick={() => setStep('cart')}
          className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
        >
          Volver al Carrito
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-purple-700">
              {step === 'cart' ? 'Mi Carrito' : 'Datos de Contacto'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {step === 'cart' ? (
            <>
              {renderCartItems()}
              {items.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-700">Total:</span>
                      <span className="text-2xl font-bold text-purple-700">
                        ${total.toLocaleString('es-CL')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('info')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Continuar con la Cotización
                  </button>
                </div>
              )}
            </>
          ) : (
            renderInfoForm()
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;