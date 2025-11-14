const Location = require('../models/Location');

// @desc    Post new location
// @route   POST /api/locations
// @access  Private
const postLocation = async (req, res) => {
  try {
    const { title } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ message: 'Please add a title' });
    }

    // Create location
    const location = await Location.create({
      title,
      createdBy: req.user.name,
      capacity: 100 // Default capacity
    });

    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all locations
// @route   GET /api/locations
// @access  Private
const getLocations = async (req, res) => {
  try {
    // Only return locations with capacity greater than 0
    const locations = await Location.find({ capacity: { $gt: 0 } });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all locations
// @route   GET /api/locations
// @access  Private
const getAllLocations = async (req, res) => {
  try {
    // Only return locations with capacity greater than 0
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update location capacity
// @route   PUT /api/locations/:id
// @access  Private
const updateLocationCapacity = async (req, res) => {
  try {
    const { capacity } = req.body;

    // Validation
    if (capacity === undefined || capacity === null) {
      return res.status(400).json({ message: 'Please provide capacity value' });
    }

    if (capacity < 0) {
      return res.status(400).json({ message: 'Capacity cannot be negative' });
    }

    // Find and update location
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    location.capacity = capacity;
    await location.save();

    res.json({
      message: 'Location capacity updated successfully',
      location
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { postLocation, getLocations, updateLocationCapacity , getAllLocations};