// Import necessary dependencies and middleware
const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
//const withAuth = require('../middleware/auth');

// Define controllers
const createUser = controllers.usersController.createUser;
const getAllUsers = controllers.usersController.getAllUsers;
const getUserById = controllers.usersController.getUserById;
const updateUser = controllers.usersController.updateUser;
const deleteUser = controllers.usersController.deleteUser;

// Define routes

// Login
//router.get('/login', withAuth, renderLogin);
//router.post('/login', loginHandler);

// User Management
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);



// // Get all users
// router.get('/', async (req, res) => {
//   // try {
//   //   const users = await User.findAll();
//   //   res.json(users);
//   // } catch (err) {
//   //   console.error(err);
//   //   res.status(500).json({ error: 'Server error' });
//   // }
// });

// // Create a new user
// router.post('/', async (req, res) => {
//   // try {
//   //   const newUser = await User.create(req.body);
//   //   res.json(newUser);
//   // } catch (err) {
//   //   console.error(err);
//   //   res.status(500).json({ error: 'Server error' });
//   // }
// });

// // Update a user
// router.put('/:id', async (req, res) => {
//   // try {
//   //   const updatedUser = await User.update(req.body, {
//   //     where: { id: req.params.id }
//   //   });
//   //   res.json(updatedUser);
//   // } catch (err) {
//   //   console.error(err);
//   //   res.status(500).json({ error: 'Server error' });
//   // }
// });

// // Delete a user
// router.delete('/:id', async (req, res) => {
//   // try {
//   //   await User.destroy({
//   //     where: { id: req.params.id }
//   //   });
//   //   res.sendStatus(200);
//   // } catch (err) {
//   //   console.error(err);
//   //   res.status(500).json({ error: 'Server error' });
//   // }
// });

// // GET /login : This would show the login page.

// // POST /login : This would handle the login form submission.

// // GET /signup : This would show the signup page.

// // POST /signup : This would handle the signup form submission, log the user in, and redirect to the dashboard.

// // POST /logout : This would log the user out.
module.exports = router;
