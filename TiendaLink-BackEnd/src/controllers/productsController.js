// src/controllers/productsController.js
const { Product, Category, OrderItem } = require('../models');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'categoryData'
        }
      ]
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discount,
      featured,
      size,
      image,
      category_id,
      section_id
    } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      discount,
      featured,
      size,
      image,
      category_id: category_id || 1, // usa 1 como valor por defecto
      section_id
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      discount,
      featured,
      size,
      image,
      category_id,
      section_id
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.discount = discount;
    product.featured = featured;
    product.size = size;
    product.image = image;
    product.category_id = category_id;
    product.section_id = section_id;

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar si el producto está asociado a algún pedido
    const relatedOrders = await OrderItem.findOne({ where: { product_id: id } });
    if (relatedOrders) {
      return res.status(400).json({
        error: 'Este producto no puede ser eliminado porque ya fue utilizado en pedidos.'
      });
    }

    await product.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
