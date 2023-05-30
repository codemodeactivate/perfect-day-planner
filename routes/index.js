// Import necessary dependencies
const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// Import your route files
const usersRoutes = require('./users');
const perfectDaysRoutes = require('./perfectdays');
const optionSetsRoutes = require('./optionsets');
const selectedOptionsRoutes = require('./selectedoptions');
const signupRoutes = require('./signup');
const loginRoutes = require('./login');

// Define routes
router.use('/users', usersRoutes);
router.use('/perfectdays', perfectDaysRoutes);
router.use('/optionsets', optionSetsRoutes);
router.use('/selectedoptions', selectedOptionsRoutes);
router.use('/login', loginRoutes);
//router.use('/signup', signupRoutes);

module.exports = router;
