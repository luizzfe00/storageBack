module.exports = function getToken(req) {
  const token = req.headers.authorization.split('Bearer ')[1];

  return token;
};