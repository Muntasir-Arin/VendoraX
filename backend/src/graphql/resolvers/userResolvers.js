const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../../prisma/client');
require('dotenv').config();
ApolloError = require('apollo-server-express').ApolloError;

const userResolver = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new ApolloError('User not authenticated', 'UNAUTHENTICATED');
      }

      const userData = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!userData) {
        throw new ApolloError('User not found', 'USER_NOT_FOUND');
      }

      return userData;
    },
  },
  Mutation: {
    register: async (_, { firstName, lastName, phone, email, password }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) throw new ApolloError('User with this email already exists', 'USER_ALREADY_EXISTS');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { firstName, lastName, phone, email, password: hashedPassword },
      });
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new ApolloError('User not found');
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new ApolloError('Invalid credentials');
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
  },
};

module.exports = userResolver;
