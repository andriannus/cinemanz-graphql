const { gql } = require('apollo-server-express');

const movieType = gql`
  input CreateMovieInput {
    cast: [String]
    director: String
    end: String
    genre: [String]
    minutes: Int
    poster: String
    producer: [String]
    production: String
    rate: Float
    start: String
    synopsis: String
    theater: [String]
    title: String
    writer: String
  }

  enum ShowingMovie {
    NOW_PLAYING
    UPCOMING
  }

  type Movie {
    _id: ID
    cast: [String]
    director: String
    end: String
    genre: [String]
    minutes: Int
    poster: String
    producer: [String]
    production: String
    rate: Float
    start: String
    synopsis: String
    theater: [String]
    title: String
    writer: String
  }

  type MovieResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: Movie
    status: String
  }

  type MoviesResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    results: [Movie]
    status: String
    total: Int
  }

  type CreatedMovieResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: Movie
    status: String
  }

  type DeletedMovieResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: Movie
    status: String
  }
`;

module.exports = { movieType };
