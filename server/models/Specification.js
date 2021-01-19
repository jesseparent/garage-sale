const mongoose = require('mongoose');

const { Schema } = mongoose;

//we need a product specifications schema that will allow the user to say whether 
//the product is new/used, in good shape or poor, etc. Similar to the way
//category works for product.

const specificationSchema = new Schema({
  used: {
    type: Boolean,
    required: true
  },
  condition: {
    type: String,
    required: true,
  },
  model: {
    type: [String]
  }
});

const Specification = mongoose.model('Specification', specificationSchema);

module.exports = Specification;