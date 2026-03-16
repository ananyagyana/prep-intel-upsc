const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  pyqId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PYQ',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mapping', mappingSchema);