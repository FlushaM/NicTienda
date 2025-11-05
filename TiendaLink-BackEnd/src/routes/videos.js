const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');

router.get('/', videosController.getAllVideos);
router.get('/section/:sectionId', videosController.getVideosBySection);
router.post('/', videosController.createVideo);
router.put('/:id', videosController.updateVideo);
router.delete('/:id', videosController.deleteVideo);

module.exports = router;
