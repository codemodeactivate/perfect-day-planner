const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');
//const withAuth = require('../middleware/auth');

// Define controllers


router.post('/', controllers.perfectDayController.create);
router.put('/:id/', controllers.perfectDayController.edit);

module.exports = router;
