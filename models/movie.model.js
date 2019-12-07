const { model, Schema } = require('mongoose');

const movieSchema = new Schema({
  title: String,
  genre: [String],
  minutes: String,
  synopsis: String,
  producer: [String],
  production: String,
  director: String,
  writer: String,
  cast: [String],
  start: String,
  end: String,
  rate: Number,
  theater: [String],
  poster: String
});

const Movie = model('Movie', movieSchema, 'movie');

module.exports = Movie;
