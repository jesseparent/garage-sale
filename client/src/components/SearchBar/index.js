import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_SPECIFIC_PRODUCTS } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import {
  Button,
  Form,
  Col
} from "react-bootstrap";

function SearchItems() {
  const [state, dispatch] = useStoreContext();

  const [searchFormState, setSearchFormState] = useState({
    searchInput: '',
    searchType: ''
  });


  const [formSubmit, { loading, data }] = useLazyQuery(QUERY_SPECIFIC_PRODUCTS);


  if (loading) {
    console.log("loading");
  }
  if (data) {
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Type: " + searchFormState.searchType);
  console.log("Search Input: " + searchFormState.searchInput);
    formSubmit({variables: { searchType: searchFormState.searchType, searchTerm: searchFormState.searchInput, page: 1, limit: 50 }});
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setSearchFormState({
      ...searchFormState,
      [name]: value
    });
  };


  useEffect(() => {
    if (data?.specificProducts?.products) {
      dispatch({
        type: UPDATE_PRODUCTS,
        searchHappens: true,
        products: data.specificProducts.products
      });
    }
  }, [data, dispatch])

  return (
    <div>
      <Form className="center search-items" onSubmit={handleSubmit}>
        <Form.Row>
        <Col xs="auto" className="my-1">
            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomerSelect" srOnly>
              Search By
            </Form.Label>
            <Form.Control
              as="select"
              className="mr-sm-2"
              name = "searchType"
              id="searchType"
              onChange={handleChange}
              custom>
              <option value="Choose">Search By...</option>
              <option value="Products">Products</option>
              <option value="Categories">Categories</option>
              <option value="Users">Users</option>
            </Form.Control>
          </Col>
          <Col xs="auto" className="my-1">
            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomerSearch" srOnly>
              Search For
            </Form.Label>
            <Form.Control as="input" rows={1} className="search-input" placeholder="Search For"
              name="searchInput"
              id="searchInput"
              onChange={handleChange}></Form.Control>
          </Col>
          <Col xs="auto" className="my-1">
            <Button variant="dark rounded-0" type="submit" className="mb-2">
              Submit
          </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>

  );
}

export default SearchItems;
