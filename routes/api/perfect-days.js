const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');

// Define controllers
router.post('/', controllers.perfectDayController.create);
<<<<<<< HEAD
router.put('/:id', controllers.perfectDayController.update); // Make sure there is a callback function defined here

=======
router.put('/:id/', controllers.perfectDayController.edit);
router.get('/:id/', controllers.perfectDayController.view);
>>>>>>> 925896016c2e2ddadd18d52bcbf7cd274cc7c073
module.exports = router;


