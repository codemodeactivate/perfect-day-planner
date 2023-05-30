const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const withAuth = require('../middleware/auth');

//define controllers
const renderLogin = controllers.authController.renderLogin;
const loginHandler = controllers.authController.login;

router.get('/', withAuth, renderLogin);
router.post('/', loginHandler);


module.exports = router;
