const { Op } = require('sequelize');

const { Producer, Product, Image } = require('../../models');



async function create(data, id) {
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

async function getAll(data) {

  try {
    const limit = Number(data.limit) || 20;
    const page = Number(data.page) || 1;
    const skip = limit * page - limit;

    const query = { producerId: data.id, name: data.name, code: data.code };

    if (data.name) {
      data.name = data.name.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&");
      data.name = { $regex: data.name, $options: "i" };
      query.name = data.name;
    }

    const { count, rows } = await Product.findAndCountAll({
      where: {
        [Op.and]: {
         [Op.eq]: query.id,
         [Op.or]: [query.name, query.code],
        },
      },
      order: [
        ['createdAt', 'DESC']
      ],
      offset: skip,
      limit,
    });

    console.log({ rows });

    return { count, page, items: rows };

  } catch (err) {
    throw new Error({ message: "Erro ao obter os produtos.", stack: err.stack });
  }

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

async function createImage(data) {

  const image = await Image.create(data);

  return image;
}

async function updateImage(productId, imageId) {
  
}

module.exports = { create, getAll, getOne, update, remove, createImage, updateImage };