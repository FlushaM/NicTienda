const { Order, OrderItem } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { name, phone, address, paymentMethod, total, items } = req.body;

    if (!name || !phone || !address || !paymentMethod || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Datos incompletos o inválidos para crear el pedido' });
    }

    const newOrder = await Order.create({
      customer_name: name,
      customer_phone: phone,
      address,
      payment_method: paymentMethod,
      status: 'pending',
      created_at: new Date()
    });

    const orderItems = items.map(item => ({
      order_id: newOrder.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ success: true, orderId: newOrder.id });
  } catch (err) {
    console.error('Error al crear pedido:', err);
    res.status(500).json({ error: 'Error al procesar el pedido' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['created_at', 'DESC']],
      include: {
        model: OrderItem,
        as: 'items',
        include: {
          model: require('../models').Product,
          as: 'product'
        }
      }
    });

    const formatted = orders.map(order => ({
      id: order.id,
      customerInfo: {
        name: order.customer_name,
        phone: order.customer_phone,
        address: order.address,
        paymentMethod: order.payment_method
      },
      items: order.items.map(item => ({
        id: item.product_id,
        title: item.product?.title || '',
        price: `$${item.price.toLocaleString('es-CL')}`,
        discount: item.product?.discount || '0',
        quantity: item.quantity
      })),
      total: order.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: order.status,
      createdAt: order.created_at
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error al obtener pedidos:', err);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};


exports.updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const validStatuses = ['pending', 'in_progress', 'paid', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Estado no válido' });
      }
  
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
  
      order.status = status;
      await order.save();
  
      res.json({ success: true, message: 'Estado actualizado', order });
    } catch (error) {
      console.error('Error al actualizar estado del pedido:', error);
      res.status(500).json({ error: 'Error al actualizar estado del pedido' });
    }
  };