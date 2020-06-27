import { gql } from 'apollo-server';

// Schema
const userSchema = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    createdAt: String
  }

  type Token {
    token: String
  }

  type TopSeller {
    total: Float
    seller: [User]
  }

  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  extend type Query {
    # Users
    getUsers: [User]
    getUser(token: String!): User

    getBestSellers: [TopSeller]
  }

  extend type Mutation {
    # Users
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token
  }
`;

export default userSchema;
