const validator = require('validator');

const { Product } = require('../../models');

async function validateProduct(req, res, next) {

  const data = req.body;

  if (!data.name)
    return res.status(400).json({ error: 'É preciso informar um nome para o produto.' });
  if (data.active && !data.image)
    return res.status(400).json({ error: 'A imagem do produto é obrigatória.' });
  if (data.imageType && data.imageType !== 'link' && ['png', 'jpeg'].indexOf(data.imageType) === -1)
    return res.status(400).json({ error: 'O tipo da imagem pode ser png ou jpeg, ou você também pode utilizar o tipo "link" e enviar um link na imagem.' });
  if (data.imageType && data.imageType !== 'link' && !validator.isBase64(data.image))
    return res.status(400).json({ error: 'O tipo da imagem só pode ser do formato base64 sem seu header data:image/<png,jpeg>;base64,.' });
  if (!data.code)
    return res.status(400).json({ error: 'É preciso informar o código do produto.' });
  if (!data.value)
    return res.status(400).json({ error: 'É preciso informar o valor do produto.' });
  if (data.quantity === 0)
    return res.status(400).json({ error: 'É preciso informar uma quantidade válida para o produto.' });


  const product = await Product.findOne({ where: { code: data.code } });

  if (product)
    return res.status(400).json({ error: 'Código já está sendo utilizado' });

  next();
}

async function validateProductImage(req, res, next) {
  const { body } = req;

  if (!body.name)
    return res.status(400).json({ error: 'É preciso informar um nome para a imagem do produto.' });
  if (!body.size)
    return res.status(400).json({ error: 'É preciso informar o tamanho da imagem do produto.' });
  if (!body.imageKey)
    return res.status(400).json({ error: 'É preciso informar uma chave para a imagem do produto.' });
  if (!body.url)
    return res.status(400).json({ error: 'É preciso informar uma url para a imagem do produto.' });

  next();
} 

module.exports = { validateProduct, validateProductImage };