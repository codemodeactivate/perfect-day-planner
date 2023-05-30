//routesindex
const express = require('express');
const router = express.Router();

// Import your route files
const usersRoutes = require('./users');
const perfectDaysRoutes = require('./perfectdays');
const optionSetsRoutes = require('./optionsets');
const selectedOptionsRoutes = require('./selectedoptions');
const loginRoutes = require('./users')
// Define routes

router.use('/login', loginRoutes); //this makes it so that when the user clicks on rootpage.com/login it references this loginroutes. click it and go to next spot. 



router.use('/users', usersRoutes);
router.use('/perfectdays', perfectDaysRoutes);
router.use('/optionsets', optionSetsRoutes);
router.use('/selectedoptions', selectedOptionsRoutes);


module.exports = router;
