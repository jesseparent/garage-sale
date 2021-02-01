import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../utils/GlobalState";

import {
  Card,
  CardDeck,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import spinner from "../assets/spinner.gif";
// import FeaturedItems from "../components/FeaturedItems";
// import { idbPromise } from "../utils/helpers";

const SearchResults = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentSearch, setCurrentSearch] = useState({
    searchResult: [],
  });

  const { products } = state;
  console.log("State");
  console.log(state);
  

  return (
    <>
      
        <div className="mainContainer">
          
          <Container className="search-container">
           <h1>Search isn't </h1>
            <div>
              {products.map((product) => (
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
                    <ListGroupItem>Age {product.age}</ListGroupItem>
                    <ListGroupItem>Model {product.model}</ListGroupItem>
                    <ListGroupItem>
                      Condition: {product.condition}
                    </ListGroupItem>

                    <ListGroupItem>
                      <Link to={`/sellerinfo/${product.seller._id}`}>
                        {product.seller.firstName} {product.seller.lastName}
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
                </Link>
              ))}
             
            </div>
          </Container>
        </div>
     
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
    </>
  );
};

export default SearchResults;
