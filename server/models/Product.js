const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  age: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  model: {
    type: String
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

productSchema.index({'$**': 'text'});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;