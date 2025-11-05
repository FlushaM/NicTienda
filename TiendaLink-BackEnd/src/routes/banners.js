const express = require('express');
const router = express.Router();
const bannersController = require('../controllers/bannersController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { verifyAdmin } = require('../middlewares/verifyRole');

router.get('/', bannersController.getAllBanners);
router.get('/section/:sectionId', bannersController.getBannersBySection);
router.post('/', authMiddleware, verifyAdmin, bannersController.createBanner);
router.put('/:id', authMiddleware, verifyAdmin, bannersController.updateBanner);
router.delete('/:id', authMiddleware, verifyAdmin, bannersController.deleteBanner);

module.exports = router;
