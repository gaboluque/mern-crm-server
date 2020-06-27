import { gql } from 'apollo-server';

// Schema
const orderSchema = gql`
  type OrderProduct {
    id: ID
    quantity: Int
  }

  type Order {
    id: ID
    order: [OrderProduct]
    total: Float
    client: ID
    seller: ID
    status: OrderStatus
    createdAt: String
    updatedAt: String
  }

  input OrderProductInput {
    id: ID!
    quantity: Int!
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
  }
`;

export default orderSchema;
