//routesindex
const express = require('express');
const router = express.Router();

// Import your route files
const usersRoutes = require('./users');
const perfectDaysRoutes = require('./perfectdays');
const optionSetsRoutes = require('./optionsets');
const selectedOptionsRoutes = require('./selectedoptions');

// Define routes
router.use('/users', usersRoutes);
router.use('/perfectdays', perfectDaysRoutes);
router.use('/optionsets', optionSetsRoutes);
router.use('/selectedoptions', selectedOptionsRoutes);

module.exports = router;
