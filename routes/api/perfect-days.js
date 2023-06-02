const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');

// Define controllers
router.post('/', controllers.perfectDayController.create);
router.put('/:id', controllers.perfectDayController.update); // Make sure there is a callback function defined here

module.exports = router;


