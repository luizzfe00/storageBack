const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Producer } = require('../../models');

async function producerLogin (email, password) {

  const producer = await Producer.findOne({ where: {
    email,
  }});

  if (!producer)
    throw new Error("Nenhum usuário encontrado com esse e-mail.");

  if (!await bcrypt.compare(password, producer.password))
    throw new Error('Senha inválida.');  

  const token = jwt.sign({
    id: producer.id,
    email: producer.email,
  }, process.env.JWT_SECRET, { expiresIn: '5min' });


  return { token };

}

module.exports = { producerLogin };