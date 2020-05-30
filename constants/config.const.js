const APP = {
  port: 7777
};

const DATABASE = {
  mongoUri: 'mongodb://admin:admin123@ds147534.mlab.com:47534/cinemanz'
};

const JWT = {
  expiresIn: '1d',
  secretKey: 'c0b4d1b4c4'
};

const STATUS = {
  error: 'error',
  fail: 'fail',
  success: 'success'
};

module.exports = { APP, DATABASE, JWT, STATUS };
