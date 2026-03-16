const express = require('express');
const { getRecommendations } = require('../controllers/recommendationController');

const router = express.Router();

// GET /api/recommendations - Get topic recommendations
router.get('/', getRecommendations);

module.exports = router;