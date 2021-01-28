const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingSchema = new Schema({
  address: {
    type: String
  },
  name: {
    type: String
  },
  phonenumber: {
    type: String
  },
  email: {
    type: String
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  alertDateTime: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;