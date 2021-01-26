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
    products: [Product]
    reviews: [Review]
    emergency_name: String
    emergency_number: String
    contacts: String
  }
  type Review {
    _id: ID
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
  type Message {
    sender: String
    text: String
    senderName: String
  }
  type Conversation {
    _id: ID
    user: User
    withUser: User
    messages: String
  }

  type ProductResult {
    products: [Product]
    currentPage: Int
    totalPages: Int
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user(_id: ID): User
    users: [User]
    reviews: [Review]
    order(_id: ID!): Order
    orders: [Order]
    checkout(products: [ID]!): Checkout
    conversations: [Conversation]
    specificProducts(search: String!, page: Int, limit: Int): ProductResult
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct(category: String!, name: String!, description: String, price: Int, age: String!, condition: String!, model: String): Product
    addReview(sellerId: ID!, reviewBody: String!): User
    deleteProduct(_id: ID!): Product
    addCategory(name: String!): Category
    updateProduct(_id: ID!, image: String!):Product
    addConversation(user: ID!, withUser: ID!, messages: String): Conversation
    addContacts(contacts: String!): User
  }
`;

module.exports = typeDefs;