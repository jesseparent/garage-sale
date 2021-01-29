const router = require('express').Router();

const stripeRoutes = require('./stripe-routes');

router.use(stripeRoutes);

module.exports = router;