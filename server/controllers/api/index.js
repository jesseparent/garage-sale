const router = require('express').Router();

const stripeRoutes = require('./stripe-routes');

router.use('/stripe', stripeRoutes);

module.exports = router;