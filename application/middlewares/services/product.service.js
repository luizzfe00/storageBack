const Producer = require('../../models/producer.model');
const Product = require('../../models/product.model');

async function create(id, data) {
  const verifyUser = await Producer.findByPk(id);

  if (!verifyUser)
    throw Error("Produtor não encontrado.");

  const body = {
    ...data,
    producerId: Number(id),
  };

  const product = await Product.create(body);

  return product;

}

module.exports = { create };