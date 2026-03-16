const Topic = require('../models/Topic');
const { getTopicRecommendations } = require('../services/mlService');

const getRecommendations = async (req, res) => {
  try {
    // Fetch all topics from database
    const topics = await Topic.find({});

    // Get ML-powered recommendations (currently mock)
    const recommendations = await getTopicRecommendations({}, topics);

    res.status(200).json({
      success: true,
      message: 'Recommendations retrieved successfully',
      data: recommendations,
      count: recommendations.length
    });

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recommendations',
      error: error.message
    });
  }
};

module.exports = {
  getRecommendations
};