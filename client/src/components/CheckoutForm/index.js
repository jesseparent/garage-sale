import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import { useStoreContext } from "../../utils/GlobalState";
import { Container, Form, Button } from 'react-bootstrap'
import CardSection from '../CardSection';

export default function CheckoutForm(props) {
  const [state, dispatch] = useStoreContext();

  console.log(state.clientSecret)

  const stripe = useStripe();
  const elements = useElements();

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
        console.log("success")
        
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

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