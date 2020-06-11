const { model, Schema } = require('mongoose');

const movieSchema = new Schema({
  title: String,
  genres: [String],
  minutes: Number,
  synopsis: String,
  producers: [String],
  production: String,
  director: String,
  writer: String,
  casts: [String],
  start: String,
  end: String,
  rate: Number,
  theaters: [String],
  poster: String
});

const Movie = model('Movie', movieSchema, 'movie');

module.exports = Movie;
