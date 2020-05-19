const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    movie(id: ID!): Movie
    movies(skip: Int!, limit: Int!): MovieResponse
    theater(id: ID!): Theater
    theaters(skip: Int!, limit: Int!): TheaterResponse
  }

  type Mutation {
    createMovie(data: CreateMovieInput): CreatedMovieResponse
    deleteMovie(id: ID!): DeletedMovieResponse
    createTheater(data: CreateTheaterInput): CreatedTheaterResponse
    deleteTheater(id: ID!): DeletedTheaterResponse
    registerUser(data: RegisterUserInput): RegisterUserResponse
    loginUser(email: String!, password: String!): LoginUserResponse
  }
`;

module.exports = { query };
