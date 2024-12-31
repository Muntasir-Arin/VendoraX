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


