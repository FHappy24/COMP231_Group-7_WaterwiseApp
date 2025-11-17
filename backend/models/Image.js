const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: [true, 'Please add an image name']
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add a user ID']
  },
  issue: {
    type: String,
    required: [true, 'Please add an issue'],
    default: "Full Bin"
  },
  location: {
    type: String,
    required: [true, 'Please select location']
  },
  priority: {
    type: String,
    required: [false, 'Please select priority'],
    default: "Low"
  },
  status: {
    type: String,
    required: false,
    default: "Reported"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);