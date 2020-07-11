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

  type UserToken {
    token: String
  }

  type UserDecodedToken {
    email: String
    iat: Int
    exp: Int
  }

  type RegisterUserResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: User
    status: String
  }

  type LoginUserResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: UserToken
    status: String
  }

  type CheckTokenUserResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    result: UserDecodedToken
    status: String
  }

  type CheckUsernameUserResponse implements Response {
    access_time_in: String
    access_time_out: String
    message: String
    status: String
  }
`;

module.exports = { userType };
