const { gql } = require('apollo-server-express');

const movieType = gql`
  type Movie {
    _id: ID
    title: String
    genre: [String]
    minutes: String
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
`;

module.exports = { movieType };
