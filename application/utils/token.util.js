module.exports = function getToken(req) {
  const token = req.header('authorization').split('auth-token ')[1];

  return token;
};