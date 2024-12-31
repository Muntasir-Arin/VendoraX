const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../../prisma/client');
require('dotenv').config();
ApolloError = require('apollo-server-express').ApolloError;

const userResolver = {
  Query: {
    me: async (_, __, { user }) => {
      console.log('user', user);
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
      // Check if user already exists by email
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) throw new ApolloError('User with this email already exists', 'USER_ALREADY_EXISTS');

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user in the database
      const user = await prisma.user.create({
        data: { firstName, lastName, phone, email, password: hashedPassword },
      });

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

      // Return token and user info
      return { token, user };
    },
    login: async (_, { email, password }) => {
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new ApolloError('User not found');

      // Compare the password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new ApolloError('Invalid credentials');

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      // Return token and user info
      return { token, user };
    },
  },
};

module.exports = userResolver;
