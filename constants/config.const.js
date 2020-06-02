const APP = {
  port: 7777
};

const DATABASE = {
  mongoUri: 'mongodb://admin:admin123@ds147534.mlab.com:47534/cinemanz'
};

const STATUS = {
  error: 'error',
  fail: 'fail',
  success: 'success'
};

module.exports = { APP, DATABASE, STATUS };
