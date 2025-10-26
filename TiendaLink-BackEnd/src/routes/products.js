// src/routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// GET /api/products
router.get('/', productsController.getProducts);

// POST /api/products
router.post('/', productsController.createProduct);

// PUT /api/products/:id
router.put('/:id', productsController.updateProduct);

// DELETE /api/products/:id
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
