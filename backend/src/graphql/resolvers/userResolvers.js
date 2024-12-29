const prisma = require('../../../prisma/client'); // Import Prisma Client

const userResolvers = {
  getUser: async (_, { id }) => {
    try {
      return await prisma.user.findUnique({ where: { id: parseInt(id) } });
    } catch (err) {
      throw new Error("Error fetching user");
    }
  },
  getAllUsers: async () => {
    try {
      return await prisma.user.findMany();
    } catch (err) {
      throw new Error("Error fetching users");
    }
  },
  createUser: async (_, { name, email }) => {
    try {
      return await prisma.user.create({
        data: { name, email },
      });
    } catch (err) {
      throw new Error("Error creating user");
    }
  },
};

module.exports = userResolvers;
