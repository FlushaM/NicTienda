const { Banner } = require('../models');

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [['position', 'ASC']]
    });
    res.json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener banners' });
  }
};

exports.getBannersBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const banners = await Banner.findAll({
      where: { sectionId },
      order: [['position', 'ASC']]
    });
    res.json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener banners' });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear banner' });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Banner.update(req.body, {
      where: { id }
    });
    if (updated) {
      const banner = await Banner.findByPk(id);
      res.json(banner);
    } else {
      res.status(404).json({ error: 'Banner no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar banner' });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Banner.destroy({
      where: { id }
    });
    if (deleted) {
      res.json({ message: 'Banner eliminado' });
    } else {
      res.status(404).json({ error: 'Banner no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar banner' });
  }
};
