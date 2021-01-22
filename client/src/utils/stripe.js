// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51IBOzADVroZQGKJNSykLKMTUywHXvgItBizO05PC8n1updChkoh0wGWEHxUYY2TzosE4EsdIGaJf8NXL36dHk3wu006pA5CDWD');

const account = await stripe.accounts.create({
  type: 'express',
});



// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51IBOzADVroZQGKJNSykLKMTUywHXvgItBizO05PC8n1updChkoh0wGWEHxUYY2TzosE4EsdIGaJf8NXL36dHk3wu006pA5CDWD');

const accountLinks = await stripe.accountLinks.create({
  account: 'acct_1032D82eZvKYlo2C',
  refresh_url: 'https://example.com/reauth',
  return_url: 'https://example.com/return',
  type: 'account_onboarding',
});



// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51IBOzADVroZQGKJNSykLKMTUywHXvgItBizO05PC8n1updChkoh0wGWEHxUYY2TzosE4EsdIGaJf8NXL36dHk3wu006pA5CDWD');

const paymentIntent = await stripe.paymentIntents.create({
  payment_method_types: ['card'],
  amount: 5,
  currency: 'usd',
  application_fee_amount: 1,
  transfer_data: {
    destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
  },
});




const express = require('express');
const app = express();

app.get('/secret', async (req, res) => {
  const intent = // ... Fetch or create the PaymentIntent
  res.json({client_secret: intent.client_secret});
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});



var response = fetch('/secret').then(function(response) {
  return response.json();
}).then(function(responseJson) {
  var clientSecret = responseJson.client_secret;
  // Call stripe.confirmCardPayment() with the client secret.
});