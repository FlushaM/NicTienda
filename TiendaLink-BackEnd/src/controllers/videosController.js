const { Video } = require('../models');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [['position', 'ASC']]
    });
    res.json(videos);
  } catch (error) {
    console.error('Error al obtener videos:', error);
    res.status(500).json({ error: 'Error al obtener videos' });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json(video);
  } catch (error) {
    console.error('Error al obtener video:', error);
    res.status(500).json({ error: 'Error al obtener video' });
  }
};

exports.createVideo = async (req, res) => {
  try {
    const { sectionId, title, videoUrl, position } = req.body;
    const video = await Video.create({
      sectionId,
      title,
      videoUrl,
      position: position || 0
    });
    res.status(201).json(video);
  } catch (error) {
    console.error('Error al crear video:', error);
    res.status(500).json({ error: 'Error al crear video' });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const { sectionId, title, videoUrl, position } = req.body;
    const video = await Video.findByPk(req.params.id);
    
    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }

    await video.update({
      sectionId,
      title,
      videoUrl,
      position
    });

    res.json(video);
  } catch (error) {
    console.error('Error al actualizar video:', error);
    res.status(500).json({ error: 'Error al actualizar video' });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    
    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }

    await video.destroy();
    res.json({ message: 'Video eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar video:', error);
    res.status(500).json({ error: 'Error al eliminar video' });
  }
};
