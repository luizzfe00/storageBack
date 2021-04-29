const express = require('express');
const multer = require('multer');

const multerConfig = require('../../../config/multer');
const Auth = require('../../middlewares/controllers/auth.handler');
const ProductController = require('../../middlewares/controllers/product.handler');
const Validate = require('../../middlewares/validations/product.validations');

const router = express.Router();

router.get('/all', Auth.verifyToken, ProductController.handleGetAll);
router.post('/', [Auth.verifyToken, Validate.validateProduct], ProductController.handleCreate);
router.get('/:id', Auth.verifyToken, ProductController.handleGetOne);
router.put('/:id', Auth.verifyToken, ProductController.handleUpdate);
router.delete('/:id', Auth.verifyToken, ProductController.handleDelete);

router.post('/image', [Auth.verifyToken], multer(multerConfig).single('image'), ProductController.handleNewProductImage);

module.exports = router;