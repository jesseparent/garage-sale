import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { QUERY_PRODUCT_USER } from "../../utils/queries";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CLIENT_SECRET } from "../../utils/actions";
import { Button, Container } from "react-bootstrap";

import CheckoutForm from "../CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IBOzADVroZQGKJNBHuaS1Tth2sbnwkctCTXEwxFQbEaMifBsjWzQDHN2wevkBSNQNFNgN55tTs6z66AlqOOEuOZ00eSSBwDEZ"
);

function StripePayment(props) {
  const [state, dispatch] = useStoreContext();
  const { id, price } = useParams();

  const { loading, error, data } = useQuery(QUERY_PRODUCT_USER, {
    variables: { _id: id },
  });

  useEffect(() => {
    if (!loading) {
      console.log(data.user);
    }
  }, [data, loading, dispatch, id, price]);

  const getTest = (async) => {
    const reqData = { id: data.user.stripeId, price: price };

    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    })
      .then((response) => response.json())
      .then((data) => {
        var clientSecret = data.client_secret;

        // Call stripe.confirmCardPayment() with the client secret.
        dispatch({
          type: UPDATE_CLIENT_SECRET,
          clientSecret: clientSecret,
        });
      });
  };

  // var response = fetch("/api/stripe/create-payment-intent")
  //   .then(function (response) {
  //     return response.json();
  //   }).then(function (responseJson) {
  //     var clientSecret = responseJson.client_secret;
  //     // Call stripe.confirmCardPayment() with the client secret.
  //   });

  return (
    <div className="mainContainer">
      <Container fluid>
        <Elements stripe={stripePromise}>
          {/* <p>cost: {price}</p> */}
          <div className="payment-intent">
          <Button
            variant="dark"
            className="rounded-0"
            onClick={() => getTest()}
          >
            Payment Intent
          </Button>
          </div>
          <CheckoutForm />
        </Elements>
      </Container>
    </div>
  );
}

export default StripePayment;
