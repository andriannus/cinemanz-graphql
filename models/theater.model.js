const { model, Schema } = require('mongoose');

const theaterSchema = new Schema({
  address: String,
  name: String,
  telephone: String
});

const Theater = model('Theater', theaterSchema, 'theater');

module.exports = Theater;
