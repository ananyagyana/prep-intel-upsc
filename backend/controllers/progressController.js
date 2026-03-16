const Progress = require('../models/Progress');

const createOrUpdateProgress = async (req, res) => {
  try {
    // Use authenticated user ID, or from body for demo purposes
    const userId = req.user?.id || req.body.userId;
    const { topicId, completionPercentage, status } = req.body;

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

    // Validate status value and normalize to internal enum
    const statusMap = {
      'not started': 'not_started',
      'not_started': 'not_started',
      'in progress': 'in_progress',
      'in_progress': 'in_progress',
      'completed': 'completed'
    };

    const normalizedStatus = statusMap[status.toString().toLowerCase()];
    if (!normalizedStatus) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: Not Started, In Progress, Completed'
      });
    }

    // Create or update progress using upsert
    const progress = await Progress.findOneAndUpdate(
      { userId, topicId }, // Filter
      { userId, topicId, completionPercentage, status: normalizedStatus }, // Update data
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
    // Use authenticated user ID, or from params for demo purposes
    const userId = req.user?.id || req.params.userId;

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