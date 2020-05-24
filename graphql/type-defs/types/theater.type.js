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

  type TheaterResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: Theater
    status: String
  }

  type TheatersResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    results: [Theater]
    status: String
    total: Int
  }

  type CreatedTheaterResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: Theater
    status: String
  }

  type DeletedTheaterResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: Theater
    status: String
  }
`;

module.exports = { theaterType };
