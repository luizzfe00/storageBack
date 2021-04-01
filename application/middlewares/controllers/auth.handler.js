const LogService = require('../services/log.service');
const { Auth } = require('../../models');

const ROLES = {
  PRODUCER: 1,
  CLIENT: 2,
};

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

async function handleLogin(req, res, next) {
  return res.locals.role === ROLES.PRODUCER
    && await handleAdminLogin(req, res, next);
}

async function handleAdminLogin(req, res, next) {

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const body = req.body;

  const headers = { ...req.headers, ip };

  LogService.info('Iniciando login do produtor da loja na plataforma.', {
    email: body.email,
  });

  const response = await Auth.create(body, headers);

  if (!response)
    return res.status(400).json({ error: 'Sei n' });

  res.locals.account = response;

  next();
}

module.exports = { handleUserType, handleLogin, handleAdminLogin };