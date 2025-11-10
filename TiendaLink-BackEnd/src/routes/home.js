const express = require('express');
const router = express.Router();
const { Section, Product, Banner, Video } = require('../models');

router.get('/', async (req, res) => {
  try {
    const sections = await Section.findAll({
      include: [
        { model: Product, as: 'items' },
        { model: Banner, as: 'banners' },
        { 
          model: Video, 
          as: 'videos',
          attributes: ['id', 'sectionId', 'title', 'videoUrl', 'position']
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