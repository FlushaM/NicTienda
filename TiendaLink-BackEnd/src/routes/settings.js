// src/routes/settings.js
const express = require('express');
const router = express.Router();
const { SiteSetting } = require('../models');

// PUT /api/settings/:key_name
router.put('/:key_name', async (req, res) => {
  try {
    const { key_name } = req.params;
    const { value } = req.body;

    // Buscar el setting por key_name
    let setting = await SiteSetting.findOne({ where: { key_name } });
    if (!setting) {
      // Si no existe, podrías crearlo
      setting = await SiteSetting.create({ key_name, value });
    } else {
      // Si existe, lo actualizas
      setting.value = value;
      await setting.save();
    }

    res.json({ message: 'Configuración actualizada', setting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar configuración' });
  }
});

module.exports = router;
