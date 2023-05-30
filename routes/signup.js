// Import necessary dependencies and middleware
const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
//const withAuth = require('../middleware/auth');
const renderSignup = controllers.viewsController.renderSignup;
const signupHandler = controllers.authController.signup;

// Define routes
router.get('/', renderSignup);
router.post('/', signupHandler);



module.exports = router;
