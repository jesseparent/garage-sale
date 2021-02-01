const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
  type Product {
    _id: ID
    pId: ID
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
    visible: Boolean
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
    stripeId: ID
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
  type Meeting {
    _id: ID
    product: Product
    address: String
    name: String
    phonenumber: String
    email: String
    buyer: User
    seller: User
    alertDateTime: String
    active: Boolean
  }

  type Result {
    products: [Product]
    users: [User]
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
    specificProducts(searchType: String!, searchTerm: String!, page: Int, limit: Int): Result
    meetings: [Meeting]
    meeting(_id: ID): Meeting
    getActiveAlerts(date: String!): [Meeting]
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addStripeId(stripeId: ID!): User
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct(category: String!, name: String!, description: String, price: Int, age: String!, condition: String!, model: String, visible: Boolean!): Product
    addReview(sellerId: ID!, reviewBody: String!): User
    deleteProduct(_id: ID!): Product
    addCategory(name: String!): Category
    updateProduct(_id: ID!, image: String!):Product
    updateProductVisability(_id: ID!, visible: Boolean!): Product
    addConversation(user: ID!, withUser: ID!, messages: String): Conversation
    addContacts(contacts: String!): User
    addMeeting(product: ID, address: String, name: String, phonenumber: String, email: String, seller: ID, alertDateTime: String): Meeting
    cancelAlert(_id: ID!): Meeting
  }
`;

module.exports = typeDefs;