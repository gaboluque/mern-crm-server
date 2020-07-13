import { gql } from 'apollo-server';

// Schema
const orderSchema = gql`
  type OrderProduct {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  type Order {
    id: ID
    order: [OrderProduct]
    total: Float
    client: Client
    seller: ID
    status: OrderStatus
    createdAt: String
    updatedAt: String
  }

  input OrderProductInput {
    id: ID!
    quantity: Int!
    name: String!
    price: Float!
  }

  enum OrderStatus {
    PENDING
    COMPLETED
    CANCELED
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    status: OrderStatus
  }

  extend type Query {
    # Orders
    getOrders: [Order]
    getSellerOrders: [Order]
    getSellerOrder(id: ID!): Order
    getOrdersByStatus(status: OrderStatus): [Order]
    getSellerOrdersByStatus(status: OrderStatus!): [Order]
  }

  extend type Mutation {
    # Orders
    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): IdObject
  }
`;

export default orderSchema;
