const express = require('express');

const auth = require('./auth.routes');
const producer = require('./producer.routes');
const product = require('./product.routes');

const router = express.Router();

router.use('/product', product);
router.use('/producer', producer);
router.use('/auth', auth);


module.exports = router;