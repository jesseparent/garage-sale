import React from "react";
import { ADD_STRIPE_ID } from "../../utils/mutations";
import { useMutation } from '@apollo/react-hooks';

function StripeOnboard(props) {

  const [addStripeId] = useMutation(ADD_STRIPE_ID);

  const setupStripe = async => {
    fetch("/api/stripe/onboard-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.url) {

          // this account id should be handled on the back end in the future. 
          // This is fast for the sake of the demo but bad for security.
          addStripeId({
            variables: {
              stripeId: data.id,
            }
          });

          window.location = data.url;
        } else {
          // elmButton.removeAttribute("disabled");
          // elmButton.textContent = "<Something went wrong>";
          console.log("data", data);
        }
      });
  }

  // var response = fetch('/secret').then(function(response) {
  //   return response.json();
  // }).then(function(responseJson) {
  //   var clientSecret = responseJson.client_secret;
  //   // Call stripe.confirmCardPayment() with the client secret.
  // });

  setupStripe()

  return (
    <div>
      {/* <button onClick={() => setupStripe()}>Setup payouts with Stripe</button> */}
    </div>
  );
}

export default StripeOnboard;
