const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers'); 
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');
require('dotenv').config();

const app = express();

const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: async ({ req }) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
    let user = null;
    console.log(req.body.variables.categories);
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await prisma.user.findUnique({
          where: { id: decoded.id },
        });
      } catch (err) {
        console.error('Invalid or expired token');
      }
    }
    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server is running at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
