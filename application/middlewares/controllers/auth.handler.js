const jwt = require('jsonwebtoken');

const getToken = require('../../utils/token.util');
const AuthService = require('../services/auth.service');
const LogService = require('../services/log.service');

const ROLES = {
  PRODUCER: 1,
  CLIENT: 2,
};

function verifyToken(req, res, next) {

  const token = getToken(req);

  if (!token || token === undefined)
    res.status(402).json({ message: "Acesso Negado" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message, message: "Token Inválido", stack: err.stack });
  }
}

function handleUserType(req, res, next) {
  const { userType } = req.params;

  if (userType === 'client') {
    res.locals.role = ROLES.CLIENT;
  } else if (userType === 'account') {
    res.locals.role = ROLES.PRODUCER;
  } else {
    return res.status(400).json({ error: 'Os parâmetros da rota estão invalidos.' });
  }

  return next();
}

async function handleProducerLogin(req, res) {
  try {

    LogService.info("Iniciando login na plataforma");

    const { email, password } = req.body;

    const response = await AuthService.producerLogin(email, password);

    return res.status(200).json(response);
  } catch (err) {

    return res.status(500).json({ message: err.message, stack: err.stack });
  }
}

module.exports = { handleUserType, handleProducerLogin, verifyToken };