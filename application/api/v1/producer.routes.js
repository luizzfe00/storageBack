const express = require('express');

const ProducerController = require('../../middlewares/controllers/producer.handler');
const ProductController = require('../../middlewares/controllers/product.handler');

const router = express.Router();

router.post('/', ProducerController.handleCreate);
router.get('/', ProducerController.handleGetAll);
router.get('/:id', ProducerController.handleGetOne);

router.post('/:id/newProduct', ProductController.handleCreate);


module.exports = router;