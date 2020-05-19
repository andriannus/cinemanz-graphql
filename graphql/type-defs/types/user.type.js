const { gql } = require('apollo-server-express');

const userType = gql`
  input RegisterUserInput {
    avatar: String
    email: String
    name: String
    password: String
    privilege: String
    username: String
  }

  type User {
    _id: ID
    avatar: String
    email: String
    name: String
    password: String
    privilege: String
    username: String
  }

  type RegisterUserResponse {
    result: User
  }

  type LoginUserResponse {
    message: String
    token: String
  }
`;

module.exports = { userType };
