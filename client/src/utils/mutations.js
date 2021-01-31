import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_STRIPE_ID = gql`
mutation addStripeId($stripeId: ID!){
  addStripeId(stripeId: $stripeId){
    _id
    firstName
    lastName
    email
    stripeId
  }
}
`

export const ADD_PRODUCT = gql`
mutation addProduct($category: String!, $name: String!, $description: String, $price: Int, $age: String!, $condition: String!, $model: String) {
  addProduct(category: $category, name: $name, description: $description, price: $price, age: $age, condition: $condition, model: $model) {
   _id
  name
  price
  age
  condition
  model
  category {
    _id
  }
  seller {
    _id
  }
  }
}
`;

export const ADD_CATEGORY = gql`
mutation addCategory($name: String!){
  addCategory(name: $name){
    _id
    name
  }
}
`;

export const UPDATE_PRODUCT = gql`
mutation($_id: ID!, $image: String!) {
  updateProduct(_id: $_id, image:$image ){
    _id
    name
    description
    image
    price
    age
    seller {
      _id
    }
    category{
      _id
    }
  }
}
`;

export const UPDATE_PRODUCT_VISABILITY = gql`
mutation($_id: ID!, $visible: Boolean!) {
  updateProductVisability(_id: $_id, visible:$visible ){
    _id
    name
    description
    image
    price
    age
    seller {
      _id
    }
    visible
  }
}
`;

export const ADD_REVIEW = gql`
mutation addReview($sellerId: ID!,$reviewBody: String!) {
  addReview(sellerId: $sellerId, reviewBody: $reviewBody) {
    _id
    reviews {
      reviewBody
      reviewer
    }
  }
}
`;

export const ADD_CONVERSATION = gql`
mutation addConversation($user:ID!, $withUser:ID!, $messages: String!) {
  addConversation(user: $user, withUser: $withUser, messages: $messages) {
    _id
    user{
      _id
    }
    withUser {
      _id
    }
    messages
  }
}
`;

export const ADD_CONTACTS = gql`
mutation ($contacts: String!) {
  addContacts(contacts: $contacts) {
    _id   
    contacts
  }
}
`;

export const ADD_MEETING = gql`
mutation addMeeting($product: ID, $address: String, $name: String, $phonenumber: String, $email: String, $seller: ID, $alertDateTime: String) {
  addMeeting(product:$product, address: $address, name: $name, phonenumber: $phonenumber, email: $email, seller: $seller, alertDateTime: $alertDateTime) {
     _id
    address
    name
    phonenumber
    email
    active
    alertDateTime
    seller {
      _id
      firstName
      lastName
    }
    buyer{
      _id
      firstName
      lastName
    }
    product {
      _id
      name
    }
  }
}
`;

export const CANCEL_ALERT = gql`
mutation cancelAlert($_id:ID!) {
  cancelAlert(_id: $_id) {
    _id
    alertDateTime
    active
  }
}
`;