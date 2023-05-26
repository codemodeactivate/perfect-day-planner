//options routes
//create, update, get?
const express = require('express');
const router = express.Router();
const SelectedOption = require('../models/SelectedOptions');

// Define routes for selected options

// Get all selected options
router.get('/', async (req, res) => {
  try {
    const selectedOptions = await SelectedOption.findAll();
    res.json(selectedOptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new selected option
router.post('/', async (req, res) => {
  try {
    const newSelectedOption = await SelectedOption.create(req.body);
    res.json(newSelectedOption);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a selected option
router.put('/:id', async (req, res) => {
  try {
    const updatedSelectedOption = await SelectedOption.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(updatedSelectedOption);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a selected option
router.delete('/:id', async (req, res) => {
  try {
    await SelectedOption.destroy({
      where: { id: req.params.id }
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
