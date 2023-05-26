//perfect days routes - sharing, etc. 
const express = require('express');
const router = express.Router();
const PerfectDay = require('../models/PerfectDays');

// Define routes for perfect days

// Get all perfect days
router.get('/', async (req, res) => {
  try {
    const perfectDays = await PerfectDay.findAll();
    res.json(perfectDays);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new perfect day
router.post('/', async (req, res) => {
  try {
    const newPerfectDay = await PerfectDay.create(req.body);
    res.json(newPerfectDay);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a perfect day
router.put('/:id', async (req, res) => {
  try {
    const updatedPerfectDay = await PerfectDay.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(updatedPerfectDay);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a perfect day
router.delete('/:id', async (req, res) => {
  try {
    await PerfectDay.destroy({
      where: { id: req.params.id }
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
