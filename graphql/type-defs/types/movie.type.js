const { gql } = require('apollo-server-express');

const movieType = gql`
  type Movie {
    _id: ID
    title: String
    genre: [String]
    minutes: Int
    synopsis: String
    producer: [String]
    production: String
    director: String
    writer: String
    cast: [String]
    start: String
    end: String
    rate: Float
    theater: [String]
    poster: String
  }

  type ResponseMovie {
    results: [Movie]
    total: Int
  }
`;

module.exports = { movieType };
