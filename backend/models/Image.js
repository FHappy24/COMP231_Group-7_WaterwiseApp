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
  location: {
    type: String,
    required: [true, 'Please add a location']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);