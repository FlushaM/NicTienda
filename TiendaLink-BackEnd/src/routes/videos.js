const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { verifyAdmin } = require('../middlewares/verifyRole');

router.get('/', videosController.getAllVideos);
router.get('/section/:sectionId', videosController.getVideosBySection);
router.post('/', authMiddleware, verifyAdmin, videosController.createVideo);
router.put('/:id', authMiddleware, verifyAdmin, videosController.updateVideo);
router.delete('/:id', authMiddleware, verifyAdmin, videosController.deleteVideo);

module.exports = router;
