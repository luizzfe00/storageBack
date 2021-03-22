const express = require('express');

const producer = require('./producer.routes');
const product = require('./product.routes');

const router = express.Router();

router.use('/product', product);
router.use('/producer', producer);

module.exports = router;