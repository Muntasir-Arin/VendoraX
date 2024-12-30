require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const prisma = require('../prisma/client');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    prisma, 
  }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT || 4000, () =>
    console.log(`Server running at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
  );
}

startServer();
