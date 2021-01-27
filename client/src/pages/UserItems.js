import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailBrief from "../components/DetailBrief";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PRODUCT_USER } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";

import { Container } from "react-bootstrap";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import { defaultTypeResolver } from "graphql";

const UserItems = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCT_USER);

  
  
  useEffect(() => {
    
    if (data && data.user && data.user.length) {
      let user = data.user;
      const targetUser = user.find((user) => user._id === id);
      console.log("targetUser");
      console.log(targetUser);

      // if (targetUser){
      setCurrentUser({
        _id: targetUser._id,
        firstName: targetUser.firstName,
        lastName: targetUser.lastName,
        productId: targetUser.products._id,
        productName: targetUser.products.name,
        productDescription: targetUser.products.description,
        productPrice: targetUser.products.price,
        productQuantity: targetUser.products.quantity,
        

        // Contacts?????
      });
    } else if (data) {
      dispatch({
        type: QUERY_PRODUCT_USER,
        user: data.user,
      });
      
        // idbPromise("user", "put", data.user);
      
    } else if (!loading) {
      idbPromise("user", "get").then((indexeduser) => {
        dispatch({
          type: QUERY_PRODUCT_USER,
          user: indexeduser,
        });
      });
    }
  }, [ data, loading, dispatch, id]);
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
