const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Product = require('./Product');

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
    type: String,
    required: true
  },
  emergency_number: {
    type: String,
    required: true
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  },
  orders: [Order.schema],
  products: [Product.schema]
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
