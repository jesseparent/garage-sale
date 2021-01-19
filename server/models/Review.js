const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewer: {
    type: String,
    required: true,
    trim: true
  },
  reviewBody: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Category = mongoose.model('Review', reviewSchema);

module.exports = Review;
