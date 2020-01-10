const { gql } = require('apollo-server-express');

const theaterType = gql`
  input DataTheater {
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

  type ResponseTheater {
    results: [Theater]
    total: Int
  }

  type CreatedTheater {
    result: Theater
  }

  type DeletedTheater {
    message: String
  }
`;

module.exports = { theaterType };
