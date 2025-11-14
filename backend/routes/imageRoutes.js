const express = require('express');
const router = express.Router();
const { postImage, getImages, getMyImages } = require('../controllers/imageController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Use upload.single('image') to handle single file upload with field name 'image'
router.post('/', protect, upload.single('image'), postImage);
router.get('/', protect, getImages);
router.get('/my-images', protect, getMyImages);

module.exports = router;