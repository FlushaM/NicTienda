const { CategoryItem } = require('../models');

exports.getItems = async (req, res) => {
  try {
    const items = await CategoryItem.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener items de categoría' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, image, category_id } = req.body;
    const newItem = await CategoryItem.create({ title, image, category_id });
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await CategoryItem.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });
    await item.destroy();
    res.json({ message: 'Item eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar item' });
  }
};
