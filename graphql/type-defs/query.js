const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    movie(id: ID!): MovieResponse
    movies(skip: Int!, limit: Int!, showing: ShowingMovie): MoviesResponse
    theater(id: ID!): TheaterResponse
    theaters(skip: Int!, limit: Int!): TheatersResponse
  }

  type Mutation {
    createMovie(data: CreateMovieInput): CreatedMovieResponse
    updateMovie(data: UpdateMovieInput): UpdatedMovieResponse
    deleteMovie(id: ID!): DeletedMovieResponse
    createTheater(data: CreateTheaterInput): CreatedTheaterResponse
    updateTheater(data: UpdateTheaterInput): UpdatedTheaterResponse
    deleteTheater(id: ID!): DeletedTheaterResponse
    registerUser(data: RegisterUserInput): RegisterUserResponse
    loginUser(email: String!, password: String!): LoginUserResponse
    checkTokenUser(token: String!): CheckTokenUserResponse
  }
`;

module.exports = { query };
