const jwt = require('jsonwebtoken');

const config = require('../../../config/environment');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token)
    return res.status(403).json({ error: 'Não há token de acesso' });

  jwt.verify(token, config.JWT_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: 'Não autorizado.' });

    req.userId = decoded.id;

    next();
  });
}

module.exports = { verifyToken };