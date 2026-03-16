const express = require('express');
const { getAllTopics } = require('../controllers/topicController');

const router = express.Router();

// GET /api/topics - Get all topics
router.get('/', getAllTopics);

module.exports = router;