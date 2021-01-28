import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../utils/GlobalState";


import { Card, Container } from "react-bootstrap";
// import Detail from "../pages/Detail.js";
import { QUERY_SPECIFIC_PRODUCTS } from '../utils/queries';

function searchResults() {

  useEffect(() => {

    console.log()
  })
  return (
    <div className="mainContainer">
      <Container>
        
      </Container>
    </div>
  );
}

export default searchResults;
