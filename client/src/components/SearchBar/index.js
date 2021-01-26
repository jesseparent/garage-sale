import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
  Button,
  Form,
  Col
  Button
} from "react-bootstrap";

function SearchItems() {
  let searchType;
  let searchTerm;
  const [value, setValue] = useState('Products');
  const [text, setText] = useState('');
  const handleOptionSelect=(e) => {
  setValue(e);
    searchType = e;
    console.log(e);
    console.log("Searchtype = " + e);
  }
  const handleTextChange = (d) => {
    setText(d);
    searchTerm = d;
    console.log("SearchTerm = " + d);
  } 

  return (
    <div>
      <Form className = "center search-items">
        <Form.Row>
          <Col xs = "auto" className = "my-1">
            <Form.Label className = "mr-sm-2" htmlFor ="inlineFormCustomerSelect" srOnly>
              Search By
            </Form.Label>
            <Form.Control
            as="select"
            onChange={e=>{console.log(e.target.value);handleOptionSelect(e.target.value)}} 
            className = "mr-sm-2"
            id="inlineFormCustomSelect"
            custom>
              <option value = "Choose">Search By...</option>
              <option value = "Products">Products</option>
              <option value = "Categories">Categories</option>
              <option value = "Users">Users</option>
            </Form.Control>
          </Col>
          <Col xs="auto" className = "my-1">
            <Form.Label className = "mr-sm-2" htmlFor = "inlineFormCustomerSearch" srOnly>
              Search For
            </Form.Label>
            <Form.Control as="input" rows={1} className = "search-input" placeholder = "Search For" 
            onChange={d=>handleTextChange(d.target.value)}></Form.Control>
          </Col>
          <Col xs="auto" className = "my-1">
          <Button type="submit" className="mb-2">
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
