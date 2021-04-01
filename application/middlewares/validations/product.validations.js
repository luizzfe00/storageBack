const validator = require('validator');

const { Product } = require('../../models');

async function validateProduct(res, req, next) {

  const data = req.body;

  const product = await Product.findOne({ where: { code: data.code } });

  if (product)
    return res.status(400).json({ error: 'Código já está sendo utilizado' });

  if (!data.name)
    return res.status(400).json({ error: 'É preciso informar um nome para o produto.' });
  if (!data.producerId)
    return res.status(400).json({ error: 'É preciso informar o id do produtor.' });
  if (!data.image)
    return res.status(400).json({ error: 'A imagem do produto é obrigatória.' });
  if (data.imageType && data.imageType !== 'link' && ['png', 'jpeg'].indexOf(data.imageType) === -1)
    return res.status(400).json({ error: 'O tipo da imagem pode ser png ou jpeg, ou você também pode utilizar o tipo "link" e enviar um link na imagem.' });
  if (data.imageType && data.imageType !== 'link' && !validator.isBase64(data.image))
    return res.status(400).json({ error: 'O tipo da imagem só pode ser do formato base64 sem seu header data:image/<png,jpeg>;base64,.' });
  if (!data.code)
    return res.status(400).json({ error: 'É preciso informar o código do produto.' });
  if (!data.active) 
    return res.status(400).json({ error: 'É preciso informar o status do produto.' });
  if (!data.value)
    return res.status(400).json({ error: 'É preciso informar o valor do produto.' });
  if (!data.quantity)
    return res.status(400).json({ error: 'É preciso informar a quantidade de intens do produto em estoque.' });
}

module.exports = { validateProduct };