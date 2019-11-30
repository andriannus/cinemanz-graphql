const APP = {
  port: 7777
};

const DATABASE = {
  mongoUri: 'mongodb://127.0.0.1/cinemanz'
};

const JWT = {
  expiresIn: '1d',
  secretKey: 'c0b4d1b4c4'
};

module.exports = { APP, DATABASE, JWT };
