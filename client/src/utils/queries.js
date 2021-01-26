import gql from 'graphql-tag';

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
  query specificProducts($search: String!, $page: Int, $limit:Int) {
  specificProducts(search:$search, page: $page, limit: $limit) {
    currentPage
    products {
      name
      description
      age
      image
    }

  }
}

`;