const { verify } = require('jsonwebtoken');

const { JWT } = require('../constants/auth.const');

const getUserAuthentication = req => {
  const token = req.headers[JWT.tokenName];

  if (!token) {
    return {
      isAuthenticated: false
    };
  }

  try {
    const decodedToken = verify(token, JWT.secretKey);

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
