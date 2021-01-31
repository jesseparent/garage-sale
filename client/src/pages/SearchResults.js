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
import FeaturedItems from "../components/FeaturedItems";
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
  useEffect(() => {
    let i = 0;
    console.log("products array");
    console.log(products[i]);

    if ((state.products.length = 0)) {
      console.log("state and products");
      console.log(state.products);
      let i = 0;
      const targetResult = products[i];
      console.log("targetResult");
      console.log(targetResult);
      if (targetResult) {
        setCurrentSearch({
          search: state.products[i],
        });
      }
    }
  }, [products, state]);

  return (
    <>
      {currentSearch ? (
        <div className="mainContainer">
          
          <Container>
            <h1>Search Happens!</h1>
            <div>
              {products.map((product) => (
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
              ))}
            </div>
          </Container>
        </div>
      ) : null}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
    </>
  );
};

export default SearchResults;
