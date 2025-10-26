// src/controllers/offersController.js

const { Offer } = require('../models');

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll({ where: { isActive: true } });
    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ofertas' });
  }
};

exports.getOffersBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const offers = await Offer.findAll({
      where: { isActive: true, section_id: sectionId }
    });
    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ofertas por sección' });
  }
};

exports.createOffer = async (req, res) => {
  try {
    const {
      title,
      image,
      link,
      isActive = true,
      section_id,
      size = 'medium'          // ← añadimos tamaño con valor por defecto
    } = req.body;

    const offer = await Offer.create({
      title,
      image,
      link,
      isActive,
      section_id,
      size                     // ← lo pasamos al create
    });

    res.json(offer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear oferta' });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      image,
      link,
      isActive,
      section_id,
      size                    // ← permitimos actualizar tamaño
    } = req.body;

    const offer = await Offer.findByPk(id);
    if (!offer) return res.status(404).json({ error: 'Oferta no encontrada' });

    offer.title      = title      ?? offer.title;
    offer.image      = image      ?? offer.image;
    offer.link       = link       ?? offer.link;
    offer.isActive   = isActive   ?? offer.isActive;
    offer.section_id = section_id ?? offer.section_id;
    offer.size       = size       ?? offer.size;    // ← actualizamos tamaño

    await offer.save();
    res.json(offer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar oferta' });
  }
};
exports.deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id);
    if (!offer) return res.status(404).json({ error: 'Oferta no encontrada' });
    await offer.destroy();
    res.json({ message: 'Oferta eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar oferta' });
  }
};
