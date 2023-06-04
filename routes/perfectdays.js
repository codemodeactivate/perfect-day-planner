
const express = require('express');
const router = express.Router();
const controllers = require('../controllers');


//user would go to http://localhost:3001/perfect-day/11/view to
//view this as a guest (v 1.0);
router.get('/:guestKey/view', controllers.perfectDayController.guestView)


router.put('/:id', controllers.perfectDayController.edit);
router.get('/:id/edit', controllers.viewsController.renderPerfectDayEdit);


//user would go to http://localhost:3001/perfect-day/11/
//to view the perfect day with id 11
router.get('/:id', controllers.perfectDayController.view);

router.get('/:id/delete', controllers.perfectDayController.delete);
module.exports = router;
