const express = require('express');
const { getAllPYQs } = require('../controllers/pyqController');

const router = express.Router();

// GET /api/pyqs - Get all PYQs
router.get('/', getAllPYQs);

module.exports = router;