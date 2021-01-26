import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
  Button
} from "react-bootstrap";

function SearchItems() {

  
  return (
    <div className="SearchItems">
      <InputGroup>
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-dark rounded-0"
          title="Category"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#">Products</Dropdown.Item>
          <Dropdown.Item href="#">Categories</Dropdown.Item>
          <Dropdown.Item href="#">Users</Dropdown.Item>
        </DropdownButton>
        <FormControl
          variant="outline-dark rounded-0"
          aria-describedby="searchInput"
          placeholder="this needs to be linked up"
        />
        <Button variant="dark" className="rounded-0">Search</Button>
      </InputGroup>
    </div>
  );
}

export default SearchItems;
