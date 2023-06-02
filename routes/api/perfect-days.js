const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');

// Define controllers
router.post('/', controllers.perfectDayController.create);

module.exports = router;
