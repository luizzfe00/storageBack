const LogService = require('../services/log.service');
const ProductService = require('../services/product.service');

async function handleCreate(req, res) {

  try {

    LogService.info('Iniciado a criação do produto.');

    const { id: producerId } = req.params;

    const body = req.body;

    const product = await ProductService.create(producerId, body);

    return res.status(201).json({ product });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

module.exports = { handleCreate };