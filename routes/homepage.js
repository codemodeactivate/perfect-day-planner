const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
//const withAuth = require('../middleware/auth');

//define controllers
const renderHomepage = controllers.viewsController.renderHomepage;


router.get('/', renderHomepage);



module.exports = router;
