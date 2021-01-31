import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import { useStoreContext } from "../../utils/GlobalState";

import CardSection from '../CardSection';

export default function CheckoutForm(props) {
  const [state, dispatch] = useStoreContext();

  const [currentState, setCurrentState] = useState({ success: 0 });

  console.log(state.clientSecret)

  const stripe = useStripe();
  const elements = useElements();


  const redirect = () => {
    window.location.replace('/');
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(state.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Test Name',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log("success!")

        // Show a success message to your customer
        setCurrentState({
          success: 1
        })
        // set timer for redirect back to home
        setTimeout(redirect, 5000);
      }
    }
  };


  // function for testing redirect and render change
  // const setSuccess = () => {
  //   console.log('clicked')

  //   setCurrentState({
  //     success: 1
  //   })

  //   setTimeout(redirect, 5000);
  // }

  return (
    <div>

      {currentState.success === 1 ? (
        <h3>Purchase Successful! Redirecting to home page in 5 seconds...</h3>
      ) :
        <form onSubmit={handleSubmit}>
          <CardSection />
          <button disabled={!stripe}>Confirm order</button>
          {/* button for testing redirect and render change uncomment to use*/}
          {/* <button onClick={() => setSuccess()}>Success = 1</button> */}
        </form>
      }
    </div>
  );
}