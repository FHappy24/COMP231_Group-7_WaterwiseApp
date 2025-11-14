const Image = require('../models/Image');
const User = require('../models/User');
const Location = require('../models/Location');

// @desc    Post new image
// @route   POST /api/images
// @access  Private
const postImage = async (req, res) => {
  try {
    const { location } = req.body;

    // Validation
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    if (!location) {
      return res.status(400).json({ message: 'Please add location' });
    }

    // Check if location exists and has capacity
    const locationDoc = await Location.findById(location);
    
    if (!locationDoc) {
      return res.status(404).json({ message: 'Location not found' });
    }

    if (locationDoc.capacity <= 0) {
      return res.status(400).json({ message: 'Location has reached maximum capacity' });
    }

    // Create image record with saved filename
    const image = await Image.create({
      imageName: req.file.filename, // Saved filename from multer
      userID: req.user._id,
      location: locationDoc.title
    });

    // Update user points - add 10 points
    await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { points: 10 } },
      { new: true }
    );

    // Update location capacity - reduce by 10
    await Location.findByIdAndUpdate(
      location,
      { $inc: { capacity: -10 } },
      { new: true }
    );

    res.status(201).json({
      message: 'Image uploaded successfully',
      image: {
        _id: image._id,
        imageName: image.imageName,
        location: image.location,
        imageUrl: `/uploads/${image.imageName}`
      },
      pointsEarned: 10
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all images
// @route   GET /api/images
// @access  Private
const getImages = async (req, res) => {
  try {
    const images = await Image.find().populate('userID', 'name email');
    
    // Add imageUrl to each image
    const imagesWithUrl = images.map(img => ({
      ...img._doc,
      imageUrl: `/uploads/${img.imageName}`
    }));
    
    res.json(imagesWithUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's images
// @route   GET /api/images/my-images
// @access  Private
const getMyImages = async (req, res) => {
  try {
    const images = await Image.find({ userID: req.user._id });
    console.log(req.user._id);
    
    // Add imageUrl to each image
    const imagesWithUrl = images.map(img => ({
      ...img._doc,
      imageUrl: `/uploads/${img.imageName}`
    }));
    
    res.json(imagesWithUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { postImage, getImages, getMyImages };