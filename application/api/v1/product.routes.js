const express = require('express');

const ProductController = require('../../middlewares/controllers/product.handler');

const router = express.Router();

router.get('/', ProductController.handleGetAll);
router.post('/:id', ProductController.handleCreate);

module.exports = router;