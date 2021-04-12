const jwt = require('jsonwebtoken');

const config = require('../../../config/environment');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token)
    return res.status(403).json({ error: 'Não há token de acesso' });

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err)
      throw new Error({ message: 'Não autorizado.', stack: err.stack  });

    req.userId = decoded.id;

    next();
  });
}

module.exports = { verifyToken };