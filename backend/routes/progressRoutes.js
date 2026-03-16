const express = require('express');
const { createOrUpdateProgress, getUserProgress } = require('../controllers/progressController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/progress - Create or update progress (protected)
router.post('/', auth, createOrUpdateProgress);

// GET /api/progress/:userId - Get all progress for a user (protected)
router.get('/:userId', auth, getUserProgress);

module.exports = router;