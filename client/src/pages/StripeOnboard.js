import React, { useState } from "react";

function StripeOnboard(props) {
  
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
          window.location = data.url;
        } else {
          // elmButton.removeAttribute("disabled");
          // elmButton.textContent = "<Something went wrong>";
          console.log("data", data);
        }
      });
  }

  var response = fetch('/secret').then(function(response) {
    return response.json();
  }).then(function(responseJson) {
    var clientSecret = responseJson.client_secret;
    // Call stripe.confirmCardPayment() with the client secret.
  });

  return (
    <div>
      <button onClick={() => setupStripe()}>Setup payouts with Stripe</button>
    </div>
  );
}

export default StripeOnboard;
