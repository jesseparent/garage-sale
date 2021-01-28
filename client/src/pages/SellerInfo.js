import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailBrief from "../components/DetailBrief";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PRODUCT_USER } from "../utils/queries";
// import { QUERY_PRODUCTS } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";

import { Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";
// import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
// import { defaultTypeResolver } from "graphql";

function SellerInfo() {
  let index = 0;
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

//   const { products } = state;

  const [currentUser, setCurrentUser] = useState({ products: [] });
  

  const { loading, data } = useQuery(QUERY_PRODUCT_USER, {
    variables: { _id: id },
  });

  useEffect(() => {
    console.log(data);

    if (!loading && data && data.user) {
      const targetUser = data.user;
      index = 0;
      console.log("targetUser");
      console.log(targetUser);

      // if (targetUser){
      setCurrentUser({
        _id: targetUser._id,
        firstName: targetUser.firstName,
        lastName: targetUser.lastName,
        products: targetUser.products,

        // Contacts?????
      });
      console.log("currentUser");
      console.log(currentUser);
      
    }
  }, [data, id, loading, setCurrentUser]);

  return (
    <>
      {currentUser ? (
        <div className="mainContainer">
          <Container>
              {/* <h2>User: {"sellerName"}</h2> */}
            {currentUser.products.map((product) => (
              <div className="seller-info" >
                <DetailBrief num={index++} />
              </div>
            ))}
          </Container>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default SellerInfo;
