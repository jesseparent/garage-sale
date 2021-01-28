import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_SPECIFIC_PRODUCTS } from '../../utils/queries';
import {
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
  Button,
  Form,
  Col
} from "react-bootstrap";

function SearchItems() {
  let searchTerm;
  const [text, setText] = useState('');
  
  const handleTextChange = (d) => {
    setText(d);
    searchTerm = d;
    console.log("SearchTerm = " + d);
  }

  return (
    <div>
      <Form className="center search-items">
        <Form.Row>
          <Col xs="auto" className="my-1">
            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomerSearch" srOnly>
              Search For
            </Form.Label>
            <Form.Control as="input" rows={1} className="search-input" placeholder="Search For"
              onChange={d => handleTextChange(d.target.value)}></Form.Control>
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

  /* return (
    <div className="Search_items">
      <InputGroup className="mb-3">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-dark rounded-0"
          title="Category"
          id="input-group-dropdown-1"
          onSelect={handleSelect}
        >
          <Dropdown.Item href="#" eventKey="Products">Products</Dropdown.Item>
          <Dropdown.Item href="#" eventKey="Categories">Categories</Dropdown.Item>
          <Dropdown.Item href="#" eventKey="Users">Users</Dropdown.Item>
        </DropdownButton>
        <FormControl
          variant="outline-dark rounded-0"
          aria-describedby="searchInput"
          placeholder="this needs to be linked up"
        />
        <Button variant="dark" className="rounded-0">Search</Button>
      </InputGroup>
    </div>
  ); */
}

export default SearchItems;
