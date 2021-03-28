const LogService = require('../services/log.service');
const ProductService = require('../services/product.service');
const validate = require('../validations/product.validations');

async function handleCreate(req, res) {

  try {

    LogService.info('Iniciado a criação do produto.');

    const { id: producerId } = req.params;

    const body = {
      ...req.body,
      producerId,
    };

    const validationError = validate.validateProduct(body);

    if (validationError)
      return res.status(validationError.code).json({ error: validationError.message });

    const product = await ProductService.create(body);

    return res.status(201).json({ product });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

async function handleGetAll(req, res) {

  try {

    const query = req.query;

    LogService.info('Iniciando busca dos produtos.');

    console.log({ query });

    query.account = res.locals.account;

    const products = await ProductService.getAll(query);

    return res.status(201).json({ products });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

async function handleGetOne(req, res) {

  try {

    const params = req.params;

    LogService.info('Iniciando busca de produto');

    if (!params.id) {
      return res.status(500).json({ error: 'O id do produto é obrigatório.' });
    }

    const product = await ProductService.get(params.id);

    if (!product) {
      return res.status(500).json({ error: 'O produto buscado não existe.' });
    }

    LogService.info('Produto obtido.');

    return res.status(201).json({ product });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

module.exports = { handleCreate, handleGetAll, handleGetOne };