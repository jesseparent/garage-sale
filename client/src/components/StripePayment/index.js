import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { QUERY_PRODUCT_USER } from "../../utils/queries";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CLIENT_SECRET, UPDATE_PRODUCT_ID } from '../../utils/actions';

import CheckoutForm from '../CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IBOzADVroZQGKJNBHuaS1Tth2sbnwkctCTXEwxFQbEaMifBsjWzQDHN2wevkBSNQNFNgN55tTs6z66AlqOOEuOZ00eSSBwDEZ");



function StripePayment(props) {
  const [state, dispatch] = useStoreContext();
  const { productId, id, price } = useParams();

  const { loading, error, data } = useQuery(QUERY_PRODUCT_USER, {
    variables: { _id: id },
  });

  useEffect(() => {

    if (!loading) {
      // console.log(data.user)

      const reqData = { id: data.user.stripeId, price: price }

      fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reqData),
      })
        .then(response => response.json())
        .then(data => {

          var clientSecret = data.client_secret;

          // Call Write client secret and productId to globalstate 
          // for the checkout form to use

          dispatch({
            type: UPDATE_CLIENT_SECRET,
            clientSecret: clientSecret
          });

          dispatch({
            type: UPDATE_PRODUCT_ID,
            productId: productId
          });
        });
    } else if (error) {
      console.log('user fetch error:')
      console.log(error)
    }

  }, [error, data, loading, dispatch, price]);


  // const getTest = async => {


  // }



  // var response = fetch("/api/stripe/create-payment-intent")
  //   .then(function (response) {
  //     return response.json();
  //   }).then(function (responseJson) {
  //     var clientSecret = responseJson.client_secret;
  //     // Call stripe.confirmCardPayment() with the client secret.
  //   });

  return (
    <Elements stripe={stripePromise}>
      <p>cost: ${price}</p>
      {/* <button onClick={() => getTest()}>Payment Intent</button> */}
      <CheckoutForm />
    </Elements>
  );
};

export default StripePayment;
