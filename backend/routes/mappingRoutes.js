const express = require('express');
const { createMapping, getMappingsByTopic, getMappingsByPYQ } = require('../controllers/mappingController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/mappings - Create a new mapping (protected)
router.post('/', auth, createMapping);

// GET /api/mappings/topic/:topicId - Get all PYQs mapped to a topic
router.get('/topic/:topicId', getMappingsByTopic);

// GET /api/mappings/pyq/:pyqId - Get all topics mapped to a PYQ
router.get('/pyq/:pyqId', getMappingsByPYQ);

module.exports = router;