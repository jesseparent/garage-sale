import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PRODUCT_USER } from "../utils/queries";

import { Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import spinner from "../assets/spinner.gif";

const UserItems = () => {
  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState({ products: [] });

  const { loading, data } = useQuery(QUERY_PRODUCT_USER, {
    variables: { _id: id },
  });

  useEffect(() => {
    if (!loading && data && data.user) {
      const targetUser = data.user;
      // if (targetUser){
      setCurrentUser({
        _id: targetUser._id,
        firstName: targetUser.firstName,
        lastName: targetUser.lastName,
        products: targetUser.products,

        // Contacts?????
      });
    }
  }, [data, id, loading, setCurrentUser]);
  return (
    <>
      {currentUser ? (
        <div className="mainContainer">
          <Container>
            <Container className="mh-100">
              {currentUser.products.map((product) => (
                <Card>
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
                      <Card.Link onClick={`/sellerinfo/${currentUser._id}`}>
                        {currentUser.firstName} {currentUser.lastName}
                      </Card.Link>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              ))}
            </Container>
          </Container>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
};

export default UserItems;
