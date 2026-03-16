const Progress = require('../models/Progress');

const createOrUpdateProgress = async (req, res) => {
  try {
    const { userId, topicId, completionPercentage, status } = req.body;

    // Validate required fields
    if (!userId || !topicId || completionPercentage === undefined || !status) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, topicId, completionPercentage, status'
      });
    }

    // Validate completionPercentage range
    if (completionPercentage < 0 || completionPercentage > 100) {
      return res.status(400).json({
        success: false,
        message: 'completionPercentage must be between 0 and 100'
      });
    }

    // Validate status enum
    const validStatuses = ['not_started', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: not_started, in_progress, completed'
      });
    }

    // Create or update progress using upsert
    const progress = await Progress.findOneAndUpdate(
      { userId, topicId }, // Filter
      { userId, topicId, completionPercentage, status }, // Update data
      {
        new: true, // Return updated document
        upsert: true, // Create if doesn't exist
        runValidators: true // Run schema validators
      }
    ).populate('topicId', 'subject topicName'); // Populate topic details

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      data: progress
    });

  } catch (error) {
    console.error('Error creating/updating progress:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating progress',
      error: error.message
    });
  }
};

const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const progress = await Progress.find({ userId })
      .populate('topicId', 'subject topicName priorityScore')
      .sort({ updatedAt: -1 }); // Sort by most recent updates

    res.status(200).json({
      success: true,
      data: progress,
      count: progress.length
    });

  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching progress',
      error: error.message
    });
  }
};

module.exports = {
  createOrUpdateProgress,
  getUserProgress
};