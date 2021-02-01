import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../../utils/GlobalState";

import {
  Card,
  CardDeck,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
// import SearchBar from "../components/SearchBar";
import spinner from "../../assets/spinner.gif";
import FeaturedItems from "../../utils/GlobalState";
// import { idbPromise } from "../utils/helpers";

const SearchResultsBrief = ({product}) => {

  console.log('searchBrief products')
  console.log(product)
  

  return (
    <>
      
        <div className="mainContainer">
          
          <Container className="search-container">
           
            <div>
            
                <Link to={`/product/${product._id}`}>
                <Card className="searchCard">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>

                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="">
                    <ListGroupItem>Price: ${product.price}</ListGroupItem>
                    <ListGroupItem>
                      Category: {product.category.name}
                    </ListGroupItem>
                    
                    <ListGroupItem>Model {product.model}</ListGroupItem>
                    

                    <ListGroupItem>
                      <Link to={`/sellerinfo/${product.seller._id}`}>
                        {product.seller.firstName} {product.seller.lastName}
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
                </Link>
            
             
            </div>
          </Container>
        </div>
      
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
    </>
  );
};

export default SearchResultsBrief;
