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
    pricePer: Float!
    priceUnit: String
    status: ProductStatus!
    ownerId: Int!
    owner: User!
    categories: [Category!]!
    createdAt: String!
    updatedAt: String!
    viewCount: Int!
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
    getUserProductTransactions: [Transaction!]!
    checkRentedProduct(productId: Int!): [Transaction!]!
    getProductTransactions(productId: Int!): [Transaction!]!
    getTopViewedAvailableProducts(limit: Int): [Product!]!


  }

  type Mutation {
    createProduct(
      name: String!
      description: String!
      price: Float!
      pricePer: Float!
      categories: [String!]!
      priceUnit: String
    ): Product!

    updateProduct(
      id: Int!
      name: String
      description: String
      price: Float
      pricePer: Float
      priceUnit: String
      categories: [String]
    ): Product!

    deleteProduct(id: Int!): DeleteProductResponse!

    rentProduct(id: Int!, startDate:String!, endDate: String!): Transaction!

    buyProduct(id: Int!): Transaction!
  }
`;

module.exports = productTypeDefs;
