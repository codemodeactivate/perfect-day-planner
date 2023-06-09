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
const homepageRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard');
const logoutRoutes = require('./logout');
const createPerfectDayRoutes = require('./api/perfect-days');
const emailCaptureRoutes = require('./emailCapture');
const captureOptionRoutes = require('./api/selected-option');
const captureOption = controllers.optionSetController.captureOption;

// Define routes
router.use('/perfect-day', perfectDaysRoutes);
router.get('/', homepageRoutes);
router.use('/login', loginRoutes);
router.use('/users', usersRoutes);
//router.use('/perfectdays', perfectDaysRoutes);
router.use('/optionsets', optionSetsRoutes);
router.use('/selectedoptions', selectedOptionsRoutes);
router.use('/signup', signupRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/logout', logoutRoutes);
router.use('/emailCapture', emailCaptureRoutes);
router.use('/api/selected-option.js', captureOptionRoutes)

router.use('/api/perfect-days', createPerfectDayRoutes);
router.post('/api/selected-option', captureOption);
//router.use('/signup', signupRoutes);

module.exports = router;
