const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    createdAt: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    age: String
    condition: String
    model: String
    seller: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    products: Product
    reviews: Review
    emergency_name: String
    emergency_number: String
  }

  type Review {
    _id: ID
    seller: User
    reviewer: String
    reviewBody: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    users: [User]
    reviews: [Review]
    order(_id: ID!): Order
    orders: [Order]
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct(category: String!, name: String!, description: String, price: Int, age: String!, condition: String!, model: String): Product
    addReview(seller: ID!, reviewer: ID!, reviewBody: String!): Review
    deleteProduct(_id: ID!): Product
    addCategory(name: String!): Category
    updateProduct(_id: ID!, image: String!):Product
  }

`;

module.exports = typeDefs;