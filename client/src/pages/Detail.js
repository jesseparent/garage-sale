import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../utils/GlobalState";

import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import SellerInfo from '../pages/SellerInfo';

import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import { Card, Container, ListGroup, ListGroupItem } from "react-bootstrap";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      const targetProduct = products.find((product) => product._id === id);

      console.log("targetProduct");
      console.log(targetProduct);

      setCurrentProduct({
        _id: targetProduct._id,
        age: targetProduct.age,
        categoryName: targetProduct.category.name,
        quantity: targetProduct.quantity,
        condition: targetProduct.condition,
        description: targetProduct.description,
        image: targetProduct.image,
        model: targetProduct.model,
        name: targetProduct.name,
        price: targetProduct.price,
        sellerFirst: targetProduct.seller.firstName,
        sellerLast: targetProduct.seller.lastName,
        sellerId: targetProduct.seller._id,
      });
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const chatWithSeller = () => {
    window.location = "/chat/" + currentProduct.sellerId;
  };

  return (
    <>
      {currentProduct ? (
        <div className="mainContainer">
          <Container>
            <Link to="/">← Back to Products</Link>

            <Card style={{ width: "40rem" }}>
              <Card.Img
                variant="top"
                src={currentProduct.image}
                // src={baseUrl + imgFileName}
                alt={currentProduct.name}
              />
              <Card.Body>
                <Card.Title>{currentProduct.name}</Card.Title>
                {/* <Card.Title>Pretty Sunset</Card.Title> */}
                <Card.Text>{currentProduct.description}</Card.Text>
                {/* <Card.Text>
                  This one is a pretty sunset that you can purchase. It isn't in
                  a picture form or anything like that. It is just the view.{" "}
                </Card.Text> */}
              </Card.Body>
              <ListGroup className="">
                <ListGroupItem>Price: ${currentProduct.price}</ListGroupItem>
                <ListGroupItem>
                  Quantity: {currentProduct.quantity}
                </ListGroupItem>
                <ListGroupItem>
                  Category: {currentProduct.categoryName}
                </ListGroupItem>
                <ListGroupItem>Age: {currentProduct.age}</ListGroupItem>
                <ListGroupItem>
                  Condition: {currentProduct.condition}
                </ListGroupItem>
                <ListGroupItem>Model: {currentProduct.model}</ListGroupItem>{" "}
                <ListGroupItem>
                  <Card.Link onClick={SellerInfo}>Seller Info</Card.Link>
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link onClick={chatWithSeller}>Chat With Seller</Card.Link>
              </Card.Body>
            </Card>
          </Container>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
