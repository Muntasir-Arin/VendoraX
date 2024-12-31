const userResolver = require('./userResolvers');
const productResolver = require('./productResolvers');
const resolvers = {
  Query: {
    ...userResolver.Query,
    ...productResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...productResolver.Mutation,
  },
};

module.exports = resolvers;
