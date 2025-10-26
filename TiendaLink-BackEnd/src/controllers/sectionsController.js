// src/controllers/sectionsController.js
const {  Section, Product, Offer } = require('../models');

exports.getSections = async (req, res) => {
  try {
    const sections = await Section.findAll({
      order: [['position', 'ASC']],
      include: [
        // Productos (sin filtrado por isActive porque no existe esa columna)
        {
          model: Product,
          as: 'items',
          required: false
        },
        // Ofertas activas
        {
          model: Offer,
          as: 'offers',
          where: { isActive: true },
          required: false
        }
      ]
    });
    res.json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener secciones' });
  }
};

exports.createSection = async (req, res) => {
  try {
    const { title, type, layout, isActive } = req.body;
    const newSection = await Section.create({ title, type, layout, isActive });
    res.json(newSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear sección' });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, layout, isActive } = req.body;

    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }

    section.title = title;
    section.type = type;
    section.layout = layout;
    section.isActive = isActive;
    await section.save();

    res.json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar sección' });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }
    await section.destroy();
    res.json({ message: 'Sección eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar sección' });
  }
};
