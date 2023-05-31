const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
//const withAuth = require('../middleware/auth');


// Define controllers
const renderDashboard = controllers.viewsController.renderDashboard;

router.get('/', renderDashboard);

module.exports = router;
