const express = require('express');

const ProductController = require('../../middlewares/controllers/product.handler');
const Validate = require('../../middlewares/validations/product.validations');

const router = express.Router();

router.get('/', ProductController.handleGetAll);
router.post('/:id', Validate.validateProduct, ProductController.handleCreate);
router.get('/:id', ProductController.handleGetOne);
router.put('/:id', ProductController.handleUpdate);
router.delete('/:id', ProductController.handleDelete);

module.exports = router;