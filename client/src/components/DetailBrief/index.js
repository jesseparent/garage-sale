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
  // const { id } = useParams();
  // const id = "601068b2eb5e4109e312bf97"

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;
  

  useEffect(() => {
    // console.log(id);
    // already in global store
    if (products.length) {
      // const targetProduct = products.find((product) => product._id === props.id);
      const targetProduct = products[props.num];
      console.log(props.num);
      console.log("targetProduct");
      console.log(targetProduct);

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

  // const baseUrl = "https://res.cloudinary.com/toomanyphotos/image/upload/";
  // const imgFileName = "zudjnabovuixrkkeym0r.jpg";
  return (
    <>
      {currentProduct ? (
        // <div className="mainContainer mh-100">
        <Container className="mh-100">
          <Card>
            {/* This will be changed later */}
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
              {/* <Card.Text variant="">
                This one is a pretty sunset that you can purchase. It isn't in a
                picture form or anything like that. It is just the view.{" "}
              </Card.Text> */}
            </Card.Body>
            <ListGroup className="">
              <ListGroupItem>Price: ${currentProduct.price}</ListGroupItem>
              <ListGroupItem>Category:</ListGroupItem>
              <ListGroupItem>Model</ListGroupItem>
              <ListGroupItem>
                <Card.Link onClick={""}>Seller Info</Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Container>
      ) : // </div>
      null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default DetailBrief;
