import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!, $lastName: String!, $phone: String!, $email: String!, $password: String!) {
    register(firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;


export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $price: Float!
    $pricePer: Float!
    $priceUnit: String
    $categories: [String!]!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      pricePer: $pricePer
      priceUnit: $priceUnit
      categories: $categories
    ) {
      id
      name
      description
      price
      pricePer
      categories
      priceUnit
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct(
    $id: Int!
    $name: String
    $description: String
    $price: Float
    $pricePer: Float
    $priceUnit: String
    $categories: [String]
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      pricePer: $pricePer
      priceUnit: $priceUnit
      categories: $categories
    ) {
      id
      name
      description
      price
      pricePer
      priceUnit
      status
      ownerId
      categories
      createdAt
      updatedAt
      viewCount
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      message
      product {
        id
        name
        description
        price
        pricePer
        priceUnit
        status
        ownerId
        categories
        createdAt
        updatedAt
        viewCount
      }
    }
  }
`;

export const RENT_PRODUCT_MUTATION = gql`
  mutation RentProduct($id: Int!, $startDate: String!, $endDate: String!) {
    rentProduct(id: $id, startDate: $startDate, endDate: $endDate) {
      id
      productId
      buyerId
      type
      startDate
      endDate
      product {
        id
        name
      }
      buyer {
        id
        firstName
        lastName
      }
    }
  }
`;

export const BUY_PRODUCT_MUTATION = gql`
  mutation BuyProduct($id: Int!) {
    buyProduct(id: $id) {
      id
      productId
      buyerId
      type
      startDate
      endDate
      product {
        id
        name
      }
      buyer {
        id
        firstName
        lastName
      }
    }
  }
`;