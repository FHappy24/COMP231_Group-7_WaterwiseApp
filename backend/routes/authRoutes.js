const express = require('express');
const router = express.Router();
const { register, login, getLeaderboard , getUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/leaderboard', getLeaderboard);
router.get('/user/:userId', protect, getUser);

module.exports = router;