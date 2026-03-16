const PYQ = require('../models/PYQ');

const getAllPYQs = async (req, res) => {
  try {
    const pyqs = await PYQ.find();
    res.status(200).json({
      success: true,
      data: pyqs,
      count: pyqs.length
    });
  } catch (error) {
    console.error('Error fetching PYQs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching PYQs',
      error: error.message
    });
  }
};

module.exports = {
  getAllPYQs
};