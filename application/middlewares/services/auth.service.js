const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const environment = require('../../../config/environment');

const Producer = require('../../models/producer.model');

const { generateToken } = require('../../../utils/crypto.utils');

async function producerLogin(email, password, headers) {

  try {

    const producer = await Producer.findOne({ where: {
      email,
      password
    } })
  }
}