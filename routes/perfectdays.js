
const express = require('express');
const router = express.Router();
const controllers = require('../controllers');



//router.get('/:id/view', controllers.perfectDayController.guestView)
//router.get('/:id/view', controllers.perfectDayController.view)
//router.get('/:id/view', controllers.perfectDayController.guestView)

router.get('/create', controllers.perfectDayController.create);
router.get('/:guestKey/view', controllers.perfectDayController.guestView);
router.get('/:id', controllers.perfectDayController.view);
router.get('/:id/view', controllers.perfectDayController.view);

router.get('/:id/edit', controllers.viewsController.renderPerfectDayEdit);
router.put('/:id', controllers.perfectDayController.edit);

router.get('/:id/delete', controllers.perfectDayController.delete);
module.exports = router;
