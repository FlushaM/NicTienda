const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryItemsController');

router.get('/', controller.getItems);
router.post('/', controller.createItem);
router.delete('/:id', controller.deleteItem);

module.exports = router;
