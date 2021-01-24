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



