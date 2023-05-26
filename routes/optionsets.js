//optionsets routes
//create update, get?
const express = require('express');
const router = express.Router();
const OptionSet = require('../models/OptionSets');

// Define routes for option sets

// Get all option sets
router.get('/', async (req, res) => {
  try {
    const optionSets = await OptionSet.findAll();
    res.json(optionSets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new option set
router.post('/', async (req, res) => {
  try {
    const newOptionSet = await OptionSet.create(req.body);
    res.json(newOptionSet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an option set
router.put('/:id', async (req, res) => {
  try {
    const updatedOptionSet = await OptionSet.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(updatedOptionSet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete an option set
router.delete('/:id', async (req, res) => {
  try {
    await OptionSet.destroy({
      where: { id: req.params.id }
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;