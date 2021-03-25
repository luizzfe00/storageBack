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

async function update(id, data) {

  const producer = await Producer.findByPk(id);

  if (producer) {

      producer.name = data.name;
      producer.email = data.email;
      producer.businessName = data.businessName;
      producer.avatar = data.avatar;
      producer.phoneNumber = data.phoneNumber;
      producer.instagram = data.instagram;
      producer.facebook = data.facebook;
      producer.website = data.website;
      producer.street = data.street;
      producer.houseNumber = data.houseNumber;
      producer.complement = data.complement;
      producer.district = data.district;
      producer.city = data.city;
      producer.state = data.state;
      producer.zipCode = data.zipCode;
      producer.country = data.country;

    await producer.save();

    return producer;

  } else {
    throw new Error("Nenhum produtor encontrado.");
  }

}

module.exports = { create, getAll, getOne, update };