const validator = require('validator');

function validateProducer(data) {
  if (!data.name)
    return { code: 400, message: 'É necessário informar um nome para o produtor.' };
  if (!data.email)
    return { code: 400, message: 'É necessário informar um e-mail.' };
  if (!validator.isEmail(data.email))
    return { code: 400, message: 'É necessário informar um e-mail válido.' };
  if (!data.password)
    return { code: 400, message: 'É necessário informar uma senha para a conta do produtor.' };
  if (!data.businessName)
    return { code: 400, message: 'É preciso informar um nome para a loja.' };
  if (!data.phoneNumber)
    return { code: 400, message: 'É preciso informar um número de telefone para o produtor.' };
  if (!data.documentType)
    return { code: 400, message: 'É preciso informar o tipo de documento do produtor' };
  if (!data.documentNumber)
    return { code: 400, message: 'É preciso informar o número do documento do produtor.' };
  if (!data.issuer)
    return { code: 400, message: 'É preciso informar o Órgão expeditor do documento.' };
}

module.exports = { validateProducer };