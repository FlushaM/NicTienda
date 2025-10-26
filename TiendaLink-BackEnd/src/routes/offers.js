const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/offersController');

router.get('/', ctrl.getOffers);
router.post('/', ctrl.createOffer);
router.put('/:id', ctrl.updateOffer);
router.delete('/:id', ctrl.deleteOffer);

module.exports = router;
