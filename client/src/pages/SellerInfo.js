import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../pages/Detail";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PRODUCT_USER } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";

import { Container } from "react-bootstrap";
import spinner from "../assets/spinner.gif";

function SellerInfo() {
  let index = 0;
  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState({ products: [] });


  const { loading, data } = useQuery(QUERY_PRODUCT_USER, {
    variables: { _id: id },
  });

  useEffect(() => {

    if (!loading && data && data.user) {
      const targetUser = data.user;
      index = 0;

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
            {/* <h2>User: {"sellerName"}</h2> */}
            {currentUser.products.map((product) => (
              <div className="seller-info" >
                <Detail num={index++} />
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
