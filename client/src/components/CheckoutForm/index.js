import React, { useState } from "react";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import { useStoreContext } from "../../utils/GlobalState";
import { Container, Form, Button } from 'react-bootstrap'
import CardSection from '../CardSection';

import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PRODUCT_VISABILITY } from "../../utils/mutations";


export default function CheckoutForm(props) {
  const [state, dispatch] = useStoreContext();

  const [updateProductVisability] = useMutation(UPDATE_PRODUCT_VISABILITY);

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
        // console.log("success!")

        //add a value that flags that it was sold.

        const mutationResponse = await updateProductVisability({
          variables: {
            _id: state.productId,
            visible: false
          }
        });
        if (mutationResponse) {
          // console.log('mutationResponse')
          // console.log(mutationResponse)

          // Show a success message to your customer
        setCurrentState({
          success: 1
        })
        // set timer for redirect back to home
        setTimeout(redirect, 5000);
        }
      }
    }
  };


  // function for testing
  // const setSuccess = () => {
  //   console.log('state')
  //   console.log(state)


  //   // console.log('clicked')

  //   // setCurrentState({
  //   //   success: 1
  //   // })

  //   // setTimeout(redirect, 5000);
  // }

  return (
    <Container >
    <Form className="stripe-cc" onSubmit={handleSubmit}>
      <CardSection />
      <Button 
      variant="dark"
      id="stripe-confirm-button"
      className="rounded-0"
      disabled={!stripe}>Confirm order</Button>
    </Form>
    </Container>
  );
}