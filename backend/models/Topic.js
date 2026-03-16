const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  topicName: {
    type: String,
    required: true,
    trim: true
  },
  priorityScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);