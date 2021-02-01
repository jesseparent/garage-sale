import gql from 'graphql-tag';

export const QUERY_PRODUCT = gql`
  query product($_id: ID!)
  {
    product(_id: $_id) {
        image
        _id
        name
        description
        model
        category {
          name
          _id
        }
      seller {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      age
      condition
      model
      category {
        _id
        name
      }
      seller{
        _id
        firstName
        lastName
        stripeId
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
{
  categories {
    _id
    name
  }
}
`;

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    orders {
      _id
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        image
      }
    }
    contacts
    stripeId
  }
}
`;

export const QUERY_PRODUCT_USER = gql`
query user($_id: ID)
{
  user(_id: $_id) {
    _id
    firstName
    lastName
    stripeId
    products {
      _id
      age
      model
      condition
      name
      image
      description
      price
      quantity
      category {
        name
      }
    }
  }
}
`;

export const QUERY_CHAT_USER = gql`
query user($_id: ID)
{
  user(_id: $_id) {
    _id
    firstName
    lastName
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_CONVERSATIONS = gql`
  query conversations {
    conversations {
      withUser{
        _id
      }
      messages
    }
  }
`;

export const QUERY_SPECIFIC_PRODUCTS = gql`
  query specificProducts($searchType: String!, $searchTerm:String!, $page: Int, $limit:Int) {
  specificProducts(searchType:$searchType, searchTerm: $searchTerm, page: $page, limit: $limit) {
    currentPage
    products {
      name
      description
      age
      image
      pId
      seller {
        lastName
        firstName
      }
      category {
        name
      }
    }
  }
}
`;

export const QUERY_ACTIVE_ALERT = gql`
query meeting($_id: ID){
  meeting(_id: $_id) {
    _id
    alertDateTime
  }
}
`;