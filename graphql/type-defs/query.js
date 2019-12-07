const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    movies: [Movie]
    theaters: [Theater]
  }
`;

module.exports = { query };
