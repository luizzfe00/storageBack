const Producer = require('../../models/producer.model');

async function create(data) {
  const verifyUser = await Producer.findOne({ 
    where: {
      email: data.email
    } 
  });

  if (!verifyUser) {
    
    const producer = await Producer.create(data);

    return producer;
  } else {

    throw new Error("Já existe um usuário com o e-mail informado.");
  }
}

async function getAll() {

  const producers = await Producer.findAll();

  return { items: producers };

}

async function getOne(id) {

  const producer = await Producer.findByPk(id);

  if (producer) {
    return { producer: producer.dataValues };
  } else {
    throw new Error("Nenhum produtor encontrado.");
  }

}

module.exports = { create, getAll, getOne };