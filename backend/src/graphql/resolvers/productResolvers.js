const { AuthenticationError } = require('apollo-server-express');
const prisma = require('../../../prisma/client'); 
require('dotenv').config();
ApolloError = require('apollo-server-express').ApolloError;

const productResolver = {
  Query: {
    getProduct: async (_, { id }) => {
      return await prisma.product.findUnique({
        where: { id },
      });
    },
    getProducts: async (_, { status}) => {
        const validStatuses = ['AVAILABLE', 'SOLD'];
        if (status && !validStatuses.includes(status)) {
          throw new Error('Invalid status');
        }
        return await prisma.product.findMany({
          where: {
            status: {
              in: validStatuses,
            }
          }, });
      },
    getUserProducts: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view your products');
      }
      return await prisma.product.findMany({
        where: {
          ownerId: user.id,
        },
      });
    },  
    getUserTransactions: async (_, __, { user }) => {
        if (!user) {
          throw new AuthenticationError('You must be logged in to view your transactions');
        }
        return await prisma.transaction.findMany({
          where: {
            buyerId: user.id,
          },
          include: {
            product: {
              include: {
                owner: true,
              },
            },
          },
        });
      },
    getProductTransactions: async (_, { productId }) => {
      return await prisma.transaction.findMany({
        where: { productId },
        include: {
          product: {
            include: {
              owner: true,
            },
          },
          buyer: true,
        },
      });
    },
  },

  checkRentedProduct: async (_, { productId }) => {
    const today = new Date();
    console.log(today);
  
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          productId,
          type: 'RENT',
          AND: [
            {
              startDate: {
                lte: today,
              },
            },
            {
              endDate: {
                gte: today,
              },
            },
          ],
        },
      });
  
      return transactions ? transactions : [];
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  },
  
  
  
  
  
  
  Mutation: {
    createProduct: async (_, { name, description, price, pricePerHour, categories }, { user }) => {
      if (!user) {
          throw new AuthenticationError('You must be logged in to create a product');
      }
  
      if (!name || !description || !price || !categories || categories.length === 0) {
          throw new Error('All fields are required, including at least one category');
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          pricePerHour,
          ownerId: user.id,
          categories: categories,
        },
      });
  
      return product;
  },
  
    updateProduct: async (_, { id, ...input }, { user }) => {
        if (!user) {
          throw new AuthenticationError('You must be logged in to update a product');
        }
  
        const product = await prisma.product.findUnique({
          where: { id },
        });
  
        if (!product) {
          throw new Error('Product not found');
        }
  
        if (product.ownerId !== user.id) {
          throw new AuthenticationError('You can only update your own products');
        }
  
        const updatedProduct = await prisma.product.update({
          where: { id },
          data: {
            name: input.name,
            description: input.description,
            price: input.price,
            pricePerHour: input.pricePerHour,
            categories: input.categories,
          },
        });
  
        return updatedProduct;
      },
    deleteProduct: async (_, { id }, { user }) => {
        if (!user) {
          throw new AuthenticationError('You must be logged in to delete a product');
        }
  
        const product = await prisma.product.findUnique({
          where: { id },
        });
  
        if (!product) {
          throw new Error('Product not found');
        }
  
        if (product.ownerId !== user.id) {
          throw new AuthenticationError('You can only delete your own products');
        }

        if (product.status === 'DELETED') {
            throw new Error('Product is already deleted');
          }
  
        const deletedProduct = await prisma.product.update({
            where: { id },
            data: {
              status: 'DELETED',
              deletedAt: new Date(), 
            },
          });

  
          return {
            message: 'Product deleted successfully',
            product: deletedProduct,
          };
      },
      buyProduct: async (_, { id }, { user }) => {
        if (!user) {
          throw new AuthenticationError('You must be logged in to buy a product');
        }
  
        const product = await prisma.product.findUnique({
          where: { id },
        });
  
        if (!product) {
          throw new Error('Product not found');
        }
        const currentDate = new Date();
        const activeRentals = await prisma.transaction.findMany({
          where: {
            productId: product.id,
            type: 'RENT',
            startDate: {
              lte: currentDate,
            },
            endDate: {
              gte: currentDate,
            },
          },
        });

        if (activeRentals.length > 0) {
          throw new Error('Product is currently on rent');
        }



  
        if (product.status !== 'AVAILABLE') {
          throw new Error('Product is not available for sale');
        }
  
        const transaction = await prisma.transaction.create({
          data: {
            productId: product.id,
            buyerId: user.id,
            type: 'BUY',
            startDate: currentDate,
          },
        });
  
        // Mark product as sold
        await prisma.product.update({
          where: { id },
          data: { status: 'SOLD' },
        });
  
        return transaction;
      },
  
      rentProduct: async (_, { id, startDate, endDate }, { user }) => {
        if (!user) {
          throw new AuthenticationError('You must be logged in to rent a product');
        }
      
        const product = await prisma.product.findUnique({
          where: { id },
        });
      
        if (!product) {
          throw new Error('Product not found');
        }
      
        if (product.status !== 'AVAILABLE') {
          throw new Error('Product is not available for rent');
        }
      
        const parsedStartDate = new Date(startDate);
        if (isNaN(parsedStartDate)) {
          throw new Error('Invalid start date');
        }
      
        const parsedEndDate = new Date(endDate);
        if (isNaN(parsedEndDate)) {
          throw new Error('Invalid end date');
        }

        if (parsedStartDate >= parsedEndDate) {
            throw new Error('End date must be after start date');
          }
        
        const overlappingTransactions = await prisma.transaction.findMany({
          where: {
            productId: product.id,
            type: 'RENT',
            startDate: {
              lte: parsedEndDate,
            },
            endDate: {
              gte: parsedStartDate,
            },
          },
        });

        if (overlappingTransactions.length > 0) {
            throw new Error('Product is already rented for the selected dates');
          }

        
      
        const transaction = await prisma.transaction.create({
          data: {
            productId: product.id,
            buyerId: user.id,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            type: 'RENT',
          },
        });
      
        return transaction;
      },
      
        },
};

module.exports = productResolver;
