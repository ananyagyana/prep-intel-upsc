const Topic = require('../models/Topic');

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json({
      success: true,
      data: topics,
      count: topics.length
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching topics',
      error: error.message
    });
  }
};

module.exports = {
  getAllTopics
};