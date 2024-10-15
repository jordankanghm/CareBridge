const express = require('express');
const Request = require('../models/Request');

const router = express.Router();

// Create request
router.post('/', async (req, res) => {
  const { description, userId } = req.body;
  const request = await Request.create({ description, elderlyId: userId });
  res.json(request);
});

// Get all requests
router.get('/', async (req, res) => {
  const requests = await Request.findAll({ where: { status: 'open' } });
  res.json(requests);
});

module.exports = router;