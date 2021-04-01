const { Producer } = require('../../models');

async function createProducer(req, res, next) {

  const data = req.body;

  const producer = await Producer.findOne({
    where: {
      email: data.email
    }
  });

  if (producer)
    return res.status(400).json({ error: 'Já existe um produtor com esse e-mail.' });

  if (!data.name)
    return res.status(400).json({ error: 'É necessário informar um nome para o produtor.' });
  if (!data.email)
    return res.status(400).json({ error: 'É necessário informar um e-mail.' });
  if (!data.password)
    return res.status(400).json({ error: 'É necessário informar uma senha para a conta do produtor.' });
  if (!data.businessName)
    return res.status(400).json({ error: 'É preciso informar um nome para a loja.' });
  if (!data.phoneNumber)
    return res.status(400).json({ error: 'É preciso informar um número de telefone para o produtor.' });
  if (!data.documentType)
    return res.status(400).json({ error: 'É preciso informar o tipo de documento do produtor.' });
  if (!data.documentNumber)
    return res.status(400).json({ error: 'É preciso informar o número do documento do produtor.' });
  if (!data.issuer)
    return res.status(400).json({ error: 'É preciso informar o Órgão expeditor do documento.' });

  next();
}

module.exports = { createProducer };