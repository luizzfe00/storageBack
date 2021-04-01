const express = require('express');

const ProducerController = require('../../middlewares/controllers/producer.handler');
const Validate = require('../../middlewares/validations/producer.validations');

const router = express.Router();

router.post('/', Validate.createProducer, ProducerController.handleCreate);
router.get('/', ProducerController.handleGetAll);
router.get('/:id', ProducerController.handleGetOne);
router.put('/:id', ProducerController.handleUpdate);




module.exports = router;