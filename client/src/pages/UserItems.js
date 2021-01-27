import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DetailBrief from "../components/DetailBrief";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";

import { Container } from "react-bootstrap";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

const UserItems = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState({});

  const { loading, data } = useQuery(QUERY_USER);

  const { user } = state;
  useEffect(() => {
    if (user.length) {
      const targetUser = user.find((user) => user._id === id);
      console.log("targetUser");
      console.log(targetUser);

      // if (targetUser){
      setCurrentUser({
        firstName: targetUser.firstName,
        lastName: targetUser.lastName,
        orderId: targetUser.orders._id,
        purchaseDate: targetUser.orders.purchaseDate,
        productId: targetUser.products._id,
        productName: targetUser.product.name,
        productDescription: targetUser.product.description,
        productPrice: targetUser.product.price,
        productQuantity: targetUser.product.quantity,
        productImg: targetUser.product.image,
        // Contacts?????
      });
    } else if (data) {
      dispatch({
        type: QUERY_USER,
        user: data.user,
      });
      data.user.forEach((user) => {
        idbPromise("user", "put", user);
      });
    } else if (!loading) {
      idbPromise("user", "get").then((indexeduser) => {
        dispatch({
          type: QUERY_USER,
          user: indexeduser,
        });
      });
    }
  }, [user, data, loading, dispatch, id]);
  return (
    <>
      {currentUser ? (
        <div className="mainContainer">
          <Container>
            <DetailBrief />
          </Container>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
};

export default UserItems;
