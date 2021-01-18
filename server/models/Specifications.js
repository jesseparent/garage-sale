const mongoose = require('mongoose');

const { Schema } = mongoose;

const specificationsSchema = new Schema({
  type: {
    type: String,
    required: true,
    trim: true
  }
});

const Category = mongoose.model('Category', specificationsSchema);

module.exports = Category;