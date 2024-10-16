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

// Update request
router.put('/:id', async (req, res) => {
  const { description } = req.body;
  const request = await Request.findByPk(req.params.id);
  if (request) {
    request.description = description;
    await request.save();
    res.json(request);
  } else {
    res.status(404).send('Request not found');
  }
});

// Delete request
router.delete('/:id', async (req, res) => {
  const request = await Request.destroy({ where: { id: req.params.id } });
  if (request) {
    res.status(204).send();
  } else {
    res.status(404).send('Request not found');
  }
});

module.exports = router;