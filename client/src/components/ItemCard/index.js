import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
// import Auth from "../utils/auth";
import { Form, Row, Col, Container, Card } from "react-bootstrap";


function ItemCard(item) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { image, name, _id, price, quantity, description } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div id="item_card">
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={`/${image}`} alt={name} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{price}</ListGroupItem>
            <ListGroupItem>{quantity}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Button onClick={addToCart}>Add To Cart</Button>
      </Container>
    </div>
  );
}
export default ItemCard;
