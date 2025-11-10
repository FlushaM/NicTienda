const { Video } = require('../models');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [['position', 'ASC']]
    });
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener videos' });
  }
};

exports.getVideosBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const videos = await Video.findAll({
      where: { sectionId },
      order: [['position', 'ASC']]
    });
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener videos' });
  }
};

exports.createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear video' });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Video.update(req.body, {
      where: { id }
    });
    if (updated) {
      const video = await Video.findByPk(id);
      res.json(video);
    } else {
      res.status(404).json({ error: 'Video no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar video' });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Video.destroy({
      where: { id }
    });
    if (deleted) {
      res.json({ message: 'Video eliminado' });
    } else {
      res.status(404).json({ error: 'Video no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar video' });
  }
};
