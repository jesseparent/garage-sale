import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { QUERY_SPECIFIC_PRODUCTS } from '../../utils/queries';
import {
  Button,
  Form,
  Col
} from "react-bootstrap";

function SearchItems() {

  const [formState, setFormState] = useState({
    searchInput: ''
  });

  const [formSubmit, { loading, data }] = useLazyQuery(QUERY_SPECIFIC_PRODUCTS, {
    variables: {search: formState.searchInput, page: 1, limit: 50}
  });
  
  if(loading) {
    console.log("loading");
  }
  if(data) {
    console.log(formState.searchInput);
    console.log("Search results are: " + data);
    console.log(data);
  }

  
 const handleChange = event => {
  const { name, value } = event.target;
  setFormState({
    ...formState,
    [name]: value
  });
};


  return (
    <div>
      <Form className="center search-items"
      onSubmit = {e => {e.preventDefault(); formSubmit()}}>
        <Form.Row>
          <Col xs="auto" className="my-1">
            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomerSearch" srOnly>
              Search For
            </Form.Label>
            <Form.Control as="input" rows={1} className="search-input" placeholder="Search For"
              name = "searchInput"
              id = "searchInput"
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
