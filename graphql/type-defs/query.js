const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    theaters: [Theater]
  }
`;

module.exports = { query };
