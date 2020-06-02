const jwt = require('jsonwebtoken');

const { JWT } = require('../constants/config.const');

const getUserAuthentication = req => {
  const token = req.headers['cinemanz-token'];

  if (!token) {
    return {
      isAuthenticated: false
    };
  }

  try {
    const decodedToken = jwt.verify(token, JWT.secretKey);

    return {
      isAuthenticated: true,
      user: decodedToken
    };
  } catch (error) {
    return {
      isAuthenticated: false
    };
  }
};

module.exports = { getUserAuthentication };
