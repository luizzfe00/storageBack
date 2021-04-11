const AuthService = require('../services/auth.service');
const LogService = require('../services/log.service');

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

module.exports = { handleUserType, handleProducerLogin };