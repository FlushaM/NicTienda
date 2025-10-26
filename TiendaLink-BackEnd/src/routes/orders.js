const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const {
  createOrder,
  getOrders
} = require('../controllers/ordersController');

// Crear pedido
router.post('/', createOrder);

// Obtener todos los pedidos
router.get('/', getOrders);

// Actualizar estado del pedido
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, status });
  } catch (error) {
    console.error('Error al actualizar el estado del pedido:', error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
});

module.exports = router;
