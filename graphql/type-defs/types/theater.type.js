const { gql } = require('apollo-server-express');

const theaterType = gql`
  type Theater {
    _id: ID
    address: String
    name: String
    telephone: String
  }
`;

module.exports = { theaterType };
