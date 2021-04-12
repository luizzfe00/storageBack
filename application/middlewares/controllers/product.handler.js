const jwt = require('jsonwebtoken');

const getToken = require('../../utils/token.util');
const LogService = require('../services/log.service');
const ProductService = require('../services/product.service');

async function handleCreate(req, res) {

  try {

    LogService.info('Iniciado a criação do produto.');

    const { id } = req.user;

    const product = await ProductService.create(req.body, id);

    return res.status(201).json({ product });
  } catch (err) {

    return res.status(500).json({ error: err.message, stack: err.stack });
  }
}

async function handleGetAll(req, res) {

  try {
    const query = req.query;

    const token = getToken(req);

    LogService.info('Iniciando busca dos produtos.');

    const { id } = jwt.decode(token, process.env.JWT_SECRET);

    query.id = id;

    const products = await ProductService.getAll(query);

    LogService.info("Produtos obtidos.");

    return res.status(201).json({ data: products });
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

async function handleUpdate(req, res) {

  try {

    const { id: productId } = req.params;

    const { body } = req;

    LogService.info('Atualizando produto.');

    const productUpdated = await ProductService.update(productId, body);

    LogService('Produto atualizado com sucesso.');

    return res.status(201).json({ product: productUpdated });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

async function handleDelete(req, res) {

  try {

    const { id: productId } = req.params;

    LogService.info('Excluíndo produto.');

    const productUpdated = await ProductService.remove(productId);

    LogService.info('Produto excluído com sucesso.');

    return res.status(201).json({ product: productUpdated });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

module.exports = { handleCreate, handleGetAll, handleGetOne, handleUpdate, handleDelete };