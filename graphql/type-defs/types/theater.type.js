const { gql } = require('apollo-server-express');

const theaterType = gql`
  input CreateTheaterInput {
    address: String
    name: String
    telephone: String
  }

  type Theater {
    _id: ID
    address: String
    name: String
    telephone: String
  }

  type TheaterResponse {
    results: [Theater]
    total: Int
  }

  type CreatedTheaterResponse {
    result: Theater
  }

  type DeletedTheaterResponse {
    message: String
  }
`;

module.exports = { theaterType };
