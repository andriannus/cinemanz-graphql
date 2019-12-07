const { gql } = require('apollo-server-express');

const theaterType = gql`
  type Theater {
    _id: ID
    address: String
    name: String
    telephone: String
  }

  type ResponseTheater {
    results: [Theater]
    total: Int
  }
`;

module.exports = { theaterType };
