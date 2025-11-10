const express = require('express');
const router = express.Router();
const { Section, Product, Category, CategoryItem, Banner, Video } = require('../models');

// GET que devuelve secciones con sus productos (alias "items") y categorías con sus cards circulares
router.get('/', async (_req, res) => {
  try {
    const sections = await Section.findAll({
      include: [
        {
          model: Product,
          as: 'items'
        },
        {
          model: Banner,
          as: 'banners'
        },
        {
          model: Video,
          as: 'videos'
        }
      ]
    });

    const categories = await Category.findAll({
      include: [
        {
          model: CategoryItem,
          as: 'categoryItems'
        }
      ]
    });

    const announcements = [
      "Revisa tu catálogo online 📱",
  "Consulta a nuestro WhatsApp: +56 9 3876 1485 💬",
  "Visítanos en Los Carrera #2242, Copiapó 📍",
    ];

    res.json({ sections, categories, announcements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos de la página' });
  }
});

module.exports = router;