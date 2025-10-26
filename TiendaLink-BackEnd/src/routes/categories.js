// src/routes/categories.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// GET /api/categories
router.get('/', categoriesController.getCategories);

// POST /api/categories
router.post('/', categoriesController.createCategory);

// PUT /api/categories/:id
router.put('/:id', categoriesController.updateCategory);

// DELETE /api/categories/:id
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
