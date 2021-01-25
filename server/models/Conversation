const mongoose = require('mongoose');

const { Schema } = mongoose;

const conversationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  withUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: {
    type: String
  }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;