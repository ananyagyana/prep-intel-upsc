const Mapping = require('../models/Mapping');
const Topic = require('../models/Topic');
const PYQ = require('../models/PYQ');

const createMapping = async (req, res) => {
  try {
    const { topicId, pyqId } = req.body;

    // Validate required fields
    if (!topicId || !pyqId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: topicId and pyqId'
      });
    }

    // Check if topic exists
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Check if PYQ exists
    const pyq = await PYQ.findById(pyqId);
    if (!pyq) {
      return res.status(404).json({
        success: false,
        message: 'PYQ not found'
      });
    }

    // Check if mapping already exists
    const existingMapping = await Mapping.findOne({ topicId, pyqId });
    if (existingMapping) {
      return res.status(409).json({
        success: false,
        message: 'Mapping already exists between this topic and PYQ'
      });
    }

    // Create new mapping
    const mapping = new Mapping({ topicId, pyqId });
    await mapping.save();

    // Populate the response
    await mapping.populate('topicId', 'subject topicName');
    await mapping.populate('pyqId', 'questionText year subject');

    res.status(201).json({
      success: true,
      message: 'Mapping created successfully',
      data: mapping
    });

  } catch (error) {
    console.error('Error creating mapping:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating mapping',
      error: error.message
    });
  }
};

const getMappingsByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: 'Topic ID is required'
      });
    }

    // Check if topic exists
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    const mappings = await Mapping.find({ topicId })
      .populate('pyqId', 'questionText year subject')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: mappings,
      count: mappings.length,
      topic: {
        id: topic._id,
        subject: topic.subject,
        topicName: topic.topicName
      }
    });

  } catch (error) {
    console.error('Error fetching mappings by topic:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mappings',
      error: error.message
    });
  }
};

const getMappingsByPYQ = async (req, res) => {
  try {
    const { pyqId } = req.params;

    if (!pyqId) {
      return res.status(400).json({
        success: false,
        message: 'PYQ ID is required'
      });
    }

    // Check if PYQ exists
    const pyq = await PYQ.findById(pyqId);
    if (!pyq) {
      return res.status(404).json({
        success: false,
        message: 'PYQ not found'
      });
    }

    const mappings = await Mapping.find({ pyqId })
      .populate('topicId', 'subject topicName priorityScore')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: mappings,
      count: mappings.length,
      pyq: {
        id: pyq._id,
        questionText: pyq.questionText,
        year: pyq.year,
        subject: pyq.subject
      }
    });

  } catch (error) {
    console.error('Error fetching mappings by PYQ:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mappings',
      error: error.message
    });
  }
};

module.exports = {
  createMapping,
  getMappingsByTopic,
  getMappingsByPYQ
};