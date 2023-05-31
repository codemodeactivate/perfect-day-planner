const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const withAuth = require('../middleware/auth');

//logout route

router.get('/', withAuth, controllers.authController.logout);

module.exports = router;
