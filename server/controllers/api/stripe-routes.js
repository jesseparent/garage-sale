const router = require('express').Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// create stripe connect user
router.post("/onboard-user", async (req, res) => {
  try {
    const account = await stripe.accounts.create({ type: "express" });
    // req.session.accountID = account.id;

    // this account id should be handled on the back end in the future. 
    // This is fast for the sake of this but bad for security.
    console.log(account.id)
    const accountId = account.id;

    const origin = `${req.headers.origin}`;
    const accountLinkURL = await generateAccountLink(account.id, origin);

    console.log(accountLinkURL)

    res.send({url: accountLinkURL, id: accountId});
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});
// generates the account link to go through account settup 
// which is handed back to onboard user
function generateAccountLink(accountID, origin) {
  return stripe.accountLinks.create({
    type: "account_onboarding",
    account: accountID,
    refresh_url: `${origin}onboard-user/refresh`,
    return_url: `${origin}`,
  }).then((link) => link.url);
}

router.get('/test', async (req, res) => {
  const dog = "test dog"

  res.json(dog);
})

// crete payment intent
router.post("/create-payment-intent", async (req, res) => {
  console.log('stripe api req:')
  // console.log(req)
  // console.log(req.body.destination)

  const dollarPrice = req.body.price * 100
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    amount: dollarPrice,
    currency: 'usd',
    // application_fee_amount: 10,
    transfer_data: {
      destination: req.body.id,
    },
  });
  res.json({client_secret: paymentIntent.client_secret})
});

// called on some form of refresh of the page on runtime
router.get("/onboard-user/refresh", async (req, res) => {
  if (!req.session.accountID) {
    res.redirect("/");
    return;
  }
  try {
    const { accountID } = req.session;
    const origin = `${req.secure ? "https://" : "https://"}${req.headers.host}`;

    const accountLinkURL = await generateAccountLink(accountID, origin)
    res.redirect(accountLinkURL);
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});








module.exports = router;