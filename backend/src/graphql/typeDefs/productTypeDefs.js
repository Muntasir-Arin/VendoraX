const { gql } = require('apollo-server-express');

const productTypeDefs = gql`
  enum ProductStatus {
    AVAILABLE
    SOLD
    DELETED
  }
  enum Category {
    ELECTRONICS
    FURNITURE
    HOME_APPLIANCES
    SPORTING_GOODS
    OUTDOOR
    TOYS
  }
  enum TransactionType {
    BUY
    RENT
  }

  enum TransactionStatus {
    PENDING
    COMPLETED
    CANCELLED
  }
  

  type Product {
    id: Int!
    name: String!
    description: String!
    price: Float!
    pricePerHour: Float!
    status: ProductStatus!
    ownerId: Int!
    owner: User!
    categories: [Category!]!
    createdAt: String!
    updatedAt: String!
  }

  type Transaction {
    id: Int!
    productId: Int!
    buyerId: Int!
    type: String!
    startDate: String!
    endDate: String
    product: Product
    buyer: User!
  }


  type DeleteProductResponse {
    message: String
    product: Product
  }

  type Query {
    getProduct(id: Int!): Product
    getProducts(status: ProductStatus, category: String): [Product!]!
    getUserProducts: [Product!]!
    getUserTransactions: [Transaction!]!
    checkRentedProduct(productId: Int!): [Transaction!]!
    getProductTransactions(productId: Int!): [Transaction!]!
  }

  type Mutation {
    createProduct(
      name: String!
      description: String!
      price: Float!
      pricePerHour: Float!
      categories: [String!]!
    ): Product!

    updateProduct(
      id: Int!
      name: String
      description: String
      price: Float
      pricePerHour: Float
      categories: [String]
    ): Product!

    deleteProduct(id: Int!): DeleteProductResponse!

    rentProduct(id: Int!, startDate:String!, endDate: String!): Transaction!

    buyProduct(id: Int!): Transaction!
  }
`;

module.exports = productTypeDefs;