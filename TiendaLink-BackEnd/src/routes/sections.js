// src/routes/sections.js
const express = require('express');
const router = express.Router();
const sectionsController = require('../controllers/sectionsController');

// GET /api/sections
router.get('/', sectionsController.getSections);

// POST /api/sections
router.post('/', sectionsController.createSection);

// PUT /api/sections/:id
router.put('/:id', sectionsController.updateSection);

// DELETE /api/sections/:id
router.delete('/:id', sectionsController.deleteSection);

module.exports = router;
