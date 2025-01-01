import { gql } from '@apollo/client';

export const GET_ME_QUERY = gql`
  query GetMe {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;

export const GET_USER_PRODUCTS = gql`
  query GetUserProducts {
    getUserProducts {
      id
      name
      description
      price
      pricePer
      priceUnit
      status
      categories
      createdAt
      updatedAt
      viewCount
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: Int!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      pricePer
      priceUnit
      status
      categories
      createdAt
      updatedAt
      viewCount
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($status: ProductStatus, $category: String) {
    getProducts(status: $status, category: $category) {
      id
      name
      description
      price
      pricePer
      priceUnit
      status
      categories
      createdAt
      updatedAt
      viewCount
    }
  }
`;

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions {
    getUserTransactions {
      id
      productId
      buyerId
      type
      startDate
      endDate
      product {
        id
        name
        price
        pricePer
        priceUnit
      }
      buyer {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const CHECK_RENTED_PRODUCT = gql`
  query CheckRentedProduct($productId: Int!) {
    checkRentedProduct(productId: $productId) {
      id
      productId
      buyerId
      type
      startDate
      endDate
    }
  }
`;

export const GET_PRODUCT_TRANSACTIONS = gql`
  query GetProductTransactions($productId: Int!) {
    getProductTransactions(productId: $productId) {
      id
      productId
      buyerId
      type
      startDate
      endDate
      product {
        id
        name
        price
      }
      buyer {
        id
        email
        firstName
        lastName
      }
    }
  }
`;