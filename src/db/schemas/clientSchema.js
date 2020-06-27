import { gql } from 'apollo-server';

// Schema
const clientSchema = gql`
  type Client {
    id: ID
    name: String
    lastName: String
    company: String
    email: String
    phone: String
    seller: ID
  }

  type TopClient {
    total: Float
    client: [Client]
  }

  input ClientInput {
    name: String!
    lastName: String!
    company: String!
    email: String!
    phone: String
  }

  extend type Query {
    # Clients
    getSellerClients: [Client]
    getClients: [Client]
    getClient(id: ID!): Client
    getBestClients: [TopClient]
  }

  extend type Mutation {
    # Clients
    newClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): String
  }
`;

export default clientSchema;
