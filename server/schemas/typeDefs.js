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
    specification: Specification
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
    products: [Product]
    reviews: Review
  }

  type Review {
    _id: ID
    reviewer: String
    reviewBody: String
    createdAt: String
  }

  type Specification {
    _id: ID
    type: String
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
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct(category: String!, name: String!, , description: String, price: Int, used: Boolean!, condition: String!, model: String, seller: ID!): Product
    addReview(seller: ID!, reviewer: ID!, reviewBody: String!): Review
    updateProduct(_id: ID!, quantity: Int! ): Product
  }

`;

module.exports = typeDefs;