const express = require('express');
const router = express.Router();
const bannersController = require('../controllers/bannersController');

router.get('/', bannersController.getAllBanners);
router.get('/section/:sectionId', bannersController.getBannersBySection);
router.post('/', bannersController.createBanner);
router.put('/:id', bannersController.updateBanner);
router.delete('/:id', bannersController.deleteBanner);

module.exports = router;
