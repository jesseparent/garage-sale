import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { useStoreContext } from "../../utils/GlobalState.js";
import { QUERY_PRODUCTS } from "../../utils/queries";
// import spinner from "../assets/spinner.gif";

import { Card, Container, ListGroup, ListGroupItem } from "react-bootstrap";
// import GetImage from '../components/GetImage';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    // else if (data) {
    //   dispatch({
    //     type: UPDATE_PRODUCTS,
    //     products: data.products,
    //   });
    // }
  }, [products, data, loading, dispatch, id]);

  const baseUrl = "https://res.cloudinary.com/toomanyphotos/image/upload/";
  const imgFileName = "zudjnabovuixrkkeym0r.jpg";
  return (
    <>
      {currentProduct && cart ? (
        // <div className="mainContainer mh-100">
          <Container className="mh-100">
            <Card>
              {/* This will be changed later */}
              <Card.Img
                variant="top"
                // src={currentProduct.image}
                src={baseUrl + imgFileName}
                alt={currentProduct.name}
              />
              <Card.Body>
                {/* <Card.Title>{currentProduct.name}</Card.Title> */}
                <Card.Title>Pretty Sunset</Card.Title>
                {/* <Card.Text>{currentProduct.description}</Card.Text> */}
                <Card.Text variant="">
                  This one is a pretty sunset that you can purchase. It isn't in
                  a picture form or anything like that. It is just the view.{" "}
                </Card.Text>
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
        // </div>
      ) : null}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
    </>
  );
}

export default Detail;
