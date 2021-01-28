import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CLIENT_SECRET } from '../../utils/actions';

import CheckoutForm from '../CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IBOzADVroZQGKJNBHuaS1Tth2sbnwkctCTXEwxFQbEaMifBsjWzQDHN2wevkBSNQNFNgN55tTs6z66AlqOOEuOZ00eSSBwDEZ");



function StripePayment() {
  const [state, dispatch] = useStoreContext();

  const getTest = async => {
    // fetch("/api/stripe/test", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   });

    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log('data')
        // console.log(data);

        var clientSecret = data.client_secret;
        // console.log('clientsecret')
        // console.log(clientSecret);

        // Call stripe.confirmCardPayment() with the client secret.
        dispatch({
          type: UPDATE_CLIENT_SECRET,
          clientSecret: clientSecret
        });

        // console.log('current global state');
        // console.log(state);
      });
  }



  // var response = fetch("/api/stripe/create-payment-intent")
  //   .then(function (response) {
  //     return response.json();
  //   }).then(function (responseJson) {
  //     var clientSecret = responseJson.client_secret;
  //     // Call stripe.confirmCardPayment() with the client secret.
  //   });

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
      <button onClick={() => getTest()}>test</button>
    </Elements>
  );
};

export default StripePayment;
