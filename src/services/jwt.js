const jwt = require("jsonwebtoken");
const { config } = require("../config");

function createJWT(body) {
  return jwt.sign(body, config.jwt.secret, {
    expiresIn: config.jwt.duration,
  });
}

function decodeJWT(jwtToken) {
  try {
    const decoded = jwt.verify(jwtToken, config.jwt.secret);
    return decoded;
  } catch (err) {
    return null;
  }
}

module.exports = { createJWT, decodeJWT };
