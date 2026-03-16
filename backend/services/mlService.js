/**
 * ML Service for Prep-Intel
 * Handles integration with external ML APIs for recommendations
 * Currently returns mock data - to be replaced with actual ML API calls
 */

const axios = require('axios'); // For future HTTP requests to ML service

/**
 * Get topic recommendations from ML service
 * @param {Object} userData - User progress data, preferences, etc.
 * @param {Array} topics - Array of available topics
 * @returns {Promise<Array>} - Array of topics with updated priority scores
 */
const getTopicRecommendations = async (userData = {}, topics = []) => {
  try {
    // Mock implementation - return topics with priority scores based on existing data
    // In production, this would be replaced with actual ML predictions
    const mockRecommendations = topics.map((topic, index) => ({
      ...topic.toObject ? topic.toObject() : topic,
      priorityScore: topic.priorityScore || (100 - index * 5), // Use existing score or calculate
      confidence: 0.8 // Mock confidence score
    }));

    // Sort by priority score descending
    mockRecommendations.sort((a, b) => b.priorityScore - a.priorityScore);

    return mockRecommendations;

  } catch (error) {
    console.error('Error in ML service:', error);
    // Fallback to original topics if ML fails
    return topics.map(topic => ({
      ...topic.toObject ? topic.toObject() : topic,
      priorityScore: 50, // Default medium priority
      confidence: 0.5
    }));
  }
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use getTopicRecommendations instead
 */
const getMockPriorityScores = async (topics) => {
  return getTopicRecommendations({}, topics);
};

module.exports = {
  getTopicRecommendations,
  getMockPriorityScores // Keep for backward compatibility
};