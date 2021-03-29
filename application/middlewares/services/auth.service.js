const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const environment = require('../../../config/environment');
const Login = require('../../models/auth.model');
const Producer = require('../../models/producer.model');
const { generateToken } = require('../../utils/crypto.utils');

async function producerLogin(email, password, headers) {

  try {

    const producer = await Producer.findOne({ where: {
      email,
      password
    }});

    if (!producer)
      return null;

    const token = await producer.generateToken('24h');

    const data = {
      producer: producer.id,
      name: producer.name,
      email: producer.email,
      userIP: String(headers.ip),
      userAgent: headers.useragent,
      referrer: headers.referrer,
    };

    const login = await Login.create(data);

    producer.password = undefined;
    producer.resetPasswordToken = undefined;
    producer.resetPasswordExpires = undefined;
    producer.apiToken = undefined;

    return { producer, token, login };
  } catch (err) {
    return { error: err.message };
  }
}