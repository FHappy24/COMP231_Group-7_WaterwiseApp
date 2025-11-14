const express = require('express');
const router = express.Router();
const { postLocation, getLocations, updateLocationCapacity, getAllLocations } = require('../controllers/locationController');
const { protect } = require('../middleware/auth');

router.post('/', protect, postLocation);
router.get('/', protect, getLocations);
router.put('/:id', protect, updateLocationCapacity);
router.get('/all', protect, getAllLocations);
module.exports = router;