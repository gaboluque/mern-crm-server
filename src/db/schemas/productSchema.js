import { gql } from 'apollo-server';

// Schema
const productSchema = gql`
  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createdAt: String
  }

  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  extend type Query {
    # Products
    getProducts: [Product]
    getProduct(id: ID!): Product
    searchProduct(text: String!): [Product]
  }

  extend type Mutation {
    # Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): IdObject
  }
`;

export default productSchema;
