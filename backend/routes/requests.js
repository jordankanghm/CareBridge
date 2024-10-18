const express = require('express');
const Request = require('../models/Request');
const User = require('../models/User');
const router = express.Router();

// GET all requests (that are open)
router.get('/', async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: { status: 'open' }, // Filter only open requests
    });
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new request with user ID in the URL
router.post('/:userId/create', async (req, res) => {
  const { description } = req.body;
  const { userId } = req.params;

  try {
    const newRequest = await Request.create({
      description,
      status: 'open',
      elderlyId: userId,
      volunteerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating request' });
  }
});

// PUT to accept a request
router.put('/:requestId/accept', async (req, res) => {
  const { requestId } = req.params;
  const { volunteerId } = req.body;

  try {
    const request = await Request.findByPk(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update the request status and assign the volunteer
    request.status = 'accepted';
    request.volunteerId = volunteerId;
    request.updatedAt = new Date();

    await request.save();

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error accepting request' });
  }
});

// Route to get requests by user ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user in the database to determine their role
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let requests;

    if (user.role === 'elderly') {
      // Get requests created by the elderly user
      requests = await Request.findAll({ where: { elderlyId: userId } });
    } else if (user.role === 'volunteer') {
      // Get requests accepted by the volunteer
      requests = await Request.findAll({ where: { volunteerId: userId } });
    } else {
      return res.status(400).json({ message: 'Invalid user role' });
    }

    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
