const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config');

module.exports = {
  create(data) {
    return jwt.sign(data, jwt_secret);
  },
  verify(token) {
    return jwt.verify(token, jwt_secret);
  },
};
