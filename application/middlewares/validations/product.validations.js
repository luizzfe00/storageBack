const validator = require('validator');

function validateProduct(data) {
  if (!data.name)
    return { code: 400, message: 'É preciso informar um nome para o produto.' };
  if (!data.producerId)
    return { code: 400, message: 'É preciso informar o id do produtor.' };
  if (!data.image)
    return { code: 400, message: 'A imagem do produto é obrigatória.' };
  if (data.imageType && data.imageType !== 'link' && ['png', 'jpeg'].indexOf(data.imageType) === -1)
    return { code: 400, message: 'O tipo da imagem pode ser png ou jpeg, ou você também pode utilizar o tipo "link" e enviar um link na imagem' };
  if (data.imageType && data.imageType !== 'link' && !validator.isBase64(data.image))
    return { code: 400, message: 'O tipo da imagem só pode ser do formato base64 sem seu header data:image/<png,jpeg>;base64,' };
  if (!data.code)
    return { code: 400, message: 'É preciso informar o código do produto.' };
  if (!data.active) 
    return { code: 400, message: 'É preciso informar o status do produto.' };
  if (!data.value)
    return { code: 400, message: 'É preciso informar o valor do produto.' };
  if (!data.quantity)
    return { code: 400, message: 'É preciso informar a quantidade de intens do produto em estoque.' };
}

module.exports = { validateProduct };