const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

module.exports = typeDefs;
