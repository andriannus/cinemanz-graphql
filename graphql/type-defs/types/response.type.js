const { gql } = require('apollo-server-express');

const responseType = gql`
  interface Response {
    access_time_in: String
    access_time_out: String
    status: String
  }
`;

module.exports = { responseType };
