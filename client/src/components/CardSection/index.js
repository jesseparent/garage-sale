/**
 * Use the CSS tab above to style your Element's container.
 */
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "./CardSectionStyles.css";
import { Container, Card } from "react-bootstrap";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  return (
    <Container>
      <Card className={"stripeCardField2"}>
      <Card.Text className={"stripeCardField"}>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </Card.Text>
      </Card>
    </Container>
  );
}

export default CardSection;
