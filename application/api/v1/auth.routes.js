const express = require('express');

const AuthController = require('../../middlewares/controllers/auth.handler');

const router = express.Router();

router.post('/signin', AuthController.handleProducerLogin);

module.exports = router;