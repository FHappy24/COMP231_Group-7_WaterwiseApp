const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  createdBy: {
    type: String,
    required: [true, 'Please add creator name']
  },
  capacity: {
    type: Number,
    default: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);