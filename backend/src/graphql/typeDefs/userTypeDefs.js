const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    phone: String!
    email: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      phone: String!
      email: String!
      password: String!
    ): AuthPayload

    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = userTypeDefs;
