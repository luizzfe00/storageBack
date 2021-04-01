const { Producer, Product } = require('../../models');


async function create(data) {
  const verifyUser = await Producer.findByPk(data.producerId);

  if (!verifyUser)
    throw Error("Produtor não encontrado.");

  const body = {
    ...data,
    producerId: Number(data.producerId),
  };

  const product = await Product.create(body);

  return product;

}

async function getAll() {

  const products = await Product.findAll();

  return { items: products };
}

async function getOne(id) {
  
  const product = await Product.findByPk(id);

  return product;
}

async function update(id, body) {

  const product = await Product.findByPk(id);

  if (product) {

    product.code = body.code;
    product.name = body.name;
    product.image = body.image;
    product.active = body.active;
    product.value = body.value;
    product.quantity = body.quantity;

    await product.save();

    return product;
  } else {
    throw new Error('Produto não foi encontrado');
  }
}

async function remove(id) {

  const product = await Product.findByPk(id);

  if (product)
    product.destroy();

  else
    throw new Error('Produto não foi encontrado');

}

module.exports = { create, getAll, getOne, update, remove };