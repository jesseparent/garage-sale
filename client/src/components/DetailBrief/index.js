import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../../utils/GlobalState.js";

import { UPDATE_PRODUCTS } from "../../utils/actions.js";
import { QUERY_PRODUCTS } from "../../utils/queries";

import { idbPromise } from "../../utils/helpers.js";
import spinner from "../../assets/spinner.gif";
import { Card, Container, ListGroup, ListGroupItem } from "react-bootstrap";

function DetailBrief(props) {
  const [state, dispatch] = useStoreContext();


  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      
     
      const targetProduct = products[props.num];
      console.log("target Product")
      console.log(targetProduct)

      if (targetProduct) {
        setCurrentProduct({
          _id: targetProduct._id,
          age: targetProduct.age,
          categoryName: targetProduct.category?.name,
          quantity: targetProduct.quantity,
          condition: targetProduct.condition,
          description: targetProduct.description,
          image: targetProduct.image,
          model: targetProduct.model,
          name: targetProduct.name,
          price: targetProduct.price,
          sellerFirst: targetProduct.seller.firstName,
          sellerLast: targetProduct.seller.lastName,
          sellerId: targetProduct.seller.sellerId,
        });
        console.log("currentProduct " + targetProduct.name)
        console.log(currentProduct)
      }
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
  }, [products, data, loading, dispatch]);

  return (
    <>
      {currentProduct ? (
        // <div className="mainContainer mh-100">
        <Container className="brief-container">
          <Link to={`/product/${currentProduct._id}`}>
            <Card>
              <Card.Img
                className="brief-img"
                variant="top"
                src={currentProduct.image}
                alt={currentProduct.name}
              />
              <Card.Body>
                <Card.Title>{currentProduct.name}</Card.Title>

                <Card.Text>{currentProduct.description}</Card.Text>
              </Card.Body>
              <ListGroup >
                <ListGroupItem>Price: ${currentProduct.price}</ListGroupItem>
                <ListGroupItem>
                  Category: {currentProduct.categoryName}
                </ListGroupItem>
                <ListGroupItem>Model: {currentProduct.model}</ListGroupItem>
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

export default DetailBrief;
