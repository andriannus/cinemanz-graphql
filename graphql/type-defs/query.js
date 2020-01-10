const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    movie(id: ID!): Movie
    movies(skip: Int!, limit: Int!): ResponseMovie
    theater(id: ID!): Theater
    theaters(skip: Int!, limit: Int!): ResponseTheater
  }

  type Mutation {
    createTheater(dataTheater: DataTheater): CreatedTheater
    deleteTheater(id: ID!): DeletedTheater
  }
`;

module.exports = { query };
