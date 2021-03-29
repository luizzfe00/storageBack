const crypto = require('crypto');

async function generateToken() {
  const buffer = await new Promise((resolve, reject) => {
    crypto.randomBytes(20, function (ex, buffer) {
      if (ex) {
        reject(new Error("error generating token"));
      }
      resolve(buffer);
    });
  });

  const token = buffer.toString('hex');

  return token;
}

async function generateApiToken() {
  const buffer = await new Promise((resolve, reject) => {
    crypto.randomBytes(22, function (ex, buffer) {
      if (ex) {
        reject(new Error("error generating token"));
      }
      resolve(buffer);
    });
  });

  const token = buffer.toString('hex');

  return token;
}

module.exports = { generateToken, generateApiToken };