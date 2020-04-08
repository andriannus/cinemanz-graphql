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

  type MovieResponse {
    results: [Movie]
    total: Int
  }

  type CreatedMovieResponse {
    result: Movie
  }

  type DeletedMovieResponse {
    message: String
  }
`;

module.exports = { movieType };
