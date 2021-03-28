const LogService = require('../services/log.service');
const ProducerService = require('../services/producer.service');
const validation = require('../validations/producer.validations');

async function handleCreate(req, res) {

  try {

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const { body } = req;

    const headers = { ...req.headers, ip };

    LogService.info('Iniciando criação de produtor.', { name: body.name });

    const validationError = validation.validateProducer(body);

    if (validationError) {
      return res.status(validationError.code).json({ error: validationError.message });
    }

    const producer = await ProducerService.create(body, headers);

    LogService.info('Produtor criado', producer);

    return res.status(201).json({ producer });

  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

async function handleGetAll(req, res) {

  try {

    LogService.info('Iniciando busca de produtores.');

    const producers = await ProducerService.getAll();

    return res.status(201).json({ producers });

  } catch (err) {

    return res.status(500).json({ error: err.message });

  }

}

async function handleGetOne(req, res) {

  try {

    const { id: producerId } = req.params; 
    
    LogService.info('Iniciando busca de produtor.');

    const producer = await ProducerService.getOne(producerId);


    return res.status(201).json(producer);
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }

}

async function handleUpdate(req, res) {

  try {

    const { id: producerId } = req.params;

    const body = req.body;

    LogService.info('Iniciando atualização de produtor.');

    const producerUpdated = await ProducerService.update(producerId, body);

    return res.status(201).json({ producer: producerUpdated });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

module.exports = { handleCreate, handleGetAll, handleGetOne, handleUpdate };