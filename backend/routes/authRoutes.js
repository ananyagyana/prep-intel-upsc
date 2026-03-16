const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

// GET /api/auth/me - Get current user profile (protected)
router.get('/me', auth, getMe);

module.exports = router;