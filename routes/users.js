//users routes - login, logout, sign up
const express = require('express');
const router = express.Router();
//const User = require('../models/Users');
const controllers = require('../controllers');
const loginHandler = controllers.userController.login; //notice there's this declaration which references the function exported from the controllers
// Define routes for users


//the two routes below are RELATIVE to the /login route because they were references from the previous path
//it's confusing at first but basically every little piece of code will be as small as possible and then roll up into
//the index.js of that folder (models, views, controllers, routes) and then be
//referenced, exported, and imported so that they can be shared and used across the application.
//this will eventually make troubleshooting way easier once this part's organized and working.


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', loginHandler);

// Get all users
router.get('/', async (req, res) => {
  // try {
  //   const users = await User.findAll();
  //   res.json(users);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Server error' });
  // }
});

// Create a new user
router.post('/', async (req, res) => {
  // try {
  //   const newUser = await User.create(req.body);
  //   res.json(newUser);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Server error' });
  // }
});

// Update a user
router.put('/:id', async (req, res) => {
  // try {
  //   const updatedUser = await User.update(req.body, {
  //     where: { id: req.params.id }
  //   });
  //   res.json(updatedUser);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Server error' });
  // }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  // try {
  //   await User.destroy({
  //     where: { id: req.params.id }
  //   });
  //   res.sendStatus(200);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Server error' });
  // }
});

// GET /login : This would show the login page.

// POST /login : This would handle the login form submission.

// GET /signup : This would show the signup page.

// POST /signup : This would handle the signup form submission, log the user in, and redirect to the dashboard.

// POST /logout : This would log the user out.
module.exports = router;
