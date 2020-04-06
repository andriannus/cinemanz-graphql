const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    movie(id: ID!): Movie
    movies(skip: Int!, limit: Int!): MovieResponse
    theater(id: ID!): Theater
    theaters(skip: Int!, limit: Int!): TheaterResponse
  }

  type Mutation {
    createTheater(theater: CreateTheaterInput): CreatedTheaterResponse
    deleteTheater(id: ID!): DeletedTheaterResponse
  }
`;

module.exports = { query };
