const Topic = require('../models/Topic');

const getRecommendations = async (req, res) => {
  try {
    // Fetch all topics and sort by priorityScore in descending order
    // This is a simple rule-based recommendation for now
    // TODO: Replace with ML-powered recommendations later
    const topics = await Topic.find({})
      .sort({ priorityScore: -1 }) // Highest priority first
      .select('subject topicName priorityScore'); // Only return relevant fields

    res.status(200).json({
      success: true,
      message: 'Recommendations retrieved successfully',
      data: topics,
      count: topics.length,
      note: 'This is a basic priority-based recommendation. ML integration coming soon.'
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