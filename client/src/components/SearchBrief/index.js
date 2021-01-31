import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../../utils/GlobalState.js";

import { UPDATE_PRODUCTS } from "../../utils/actions.js";
import { QUERY_PRODUCTS } from "../../utils/queries";

import { idbPromise } from "../../utils/helpers.js";
import spinner from "../../assets/spinner.gif";
import { Card, Container, ListGroup, ListGroupItem } from "react-bootstrap";

function SearchBrief(props) {
  const [state, dispatch] = useStoreContext();


  const [searchBrief, setSearchBrief] = useState({
   searchResult: [] ,
  });

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      
     
      const searchResults = products[props.num];
      

      if (searchResults) {
        setSearchBrief({
          
        });
        console.log("searchBrief " + searchResults.name)
        console.log(searchBrief)
      }
    }
   
    
  }, [products, data, loading, dispatch]);

  return (
    <>
      {searchBrief ? (
        // <div className="mainContainer mh-100">
        <Container className="brief-container">
          <Link to={`/product/${searchBrief._id}`}>
            <Card>
              <Card.Img
                className="brief-img"
                variant="top"
                src={searchBrief.image}
                alt={searchBrief.name}
              />
              <Card.Body>
                <Card.Title>{searchBrief.name}</Card.Title>

                <Card.Text>{searchBrief.description}</Card.Text>
              </Card.Body>
              <ListGroup className="">
                <ListGroupItem>Price: ${searchBrief.price}</ListGroupItem>
                <ListGroupItem>
                  Category: {searchBrief.categoryName}
                </ListGroupItem>
                <ListGroupItem>Model: {searchBrief.model}</ListGroupItem>
              </ListGroup>
            </Card>
          </Link>
        </Container>
      ) : // </div>
        null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default SearchBrief;
