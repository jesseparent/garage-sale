const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Product = require('./Product');
const Review = require('./Review');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  emergency_name: {
    type: String
  },
  emergency_number: {
    type: String
  },
  emergency_number: {
    type: String,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  },
  products: {
    type: Schema.Types.ObjectId,
    rev: 'Product'
  },
  orders: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  contacts: {
    type: String,
  },
});

userSchema.virtual('reviewCount').get(function () {
  return this.reviews.length;
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;