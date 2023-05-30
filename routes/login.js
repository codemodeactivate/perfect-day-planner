const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const withAuth = require('../middleware/auth');

//define controllers
const renderLogin = controllers.viewsController.renderLogin;
const loginHandler = controllers.authController.login;

router.get('/', renderLogin);
router.post('/', loginHandler);


module.exports = router;
