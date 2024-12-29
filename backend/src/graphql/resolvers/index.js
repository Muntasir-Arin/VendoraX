const userResolvers = require('./userResolvers');

const resolvers = {
  Query: {
    getUser: userResolvers.getUser,
    getAllUsers: userResolvers.getAllUsers,
  },
  Mutation: {
    createUser: userResolvers.createUser,
  },
};

module.exports = resolvers;
