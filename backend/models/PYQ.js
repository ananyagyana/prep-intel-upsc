const mongoose = require('mongoose');

const pyqSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear()
  },
  subject: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PYQ', pyqSchema);