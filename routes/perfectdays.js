// //perfect days routes - sharing, etc.
// const express = require('express');
// const router = express.Router();
// const PerfectDay = require('../models/PerfectDays');
const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// // Define routes for perfect days

// // Get all perfect days
// router.get('/', async (req, res) => {
//   try {
//     const perfectDays = await PerfectDay.findAll();
//     res.json(perfectDays);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Create a new perfect day
// router.post('/', async (req, res) => {
//   try {
//     const newPerfectDay = await PerfectDay.create(req.body);
//     res.json(newPerfectDay);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update a perfect day
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedPerfectDay = await PerfectDay.update(req.body, {
//       where: { id: req.params.id }
//     });
//     res.json(updatedPerfectDay);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Delete a perfect day
// router.delete('/:id', async (req, res) => {
//   try {
//     await PerfectDay.destroy({
//       where: { id: req.params.id }
//     });
//     res.sendStatus(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.put('/:id', controllers.perfectDayController.edit);
router.get('/:id/edit', controllers.viewsController.renderPerfectDayEdit);


// GET /perfectday/new : This would show the form to create a new "Perfect Day".

// POST /perfectday : This would handle the submission of the "Perfect Day" form and create a new "Perfect Day".

// GET /perfectday/:id : This would show a specific "Perfect Day" with the provided ID.

// POST /perfectday/:id : This would handle the submission of the choices made by the partner on the "Perfect Day" page.

module.exports = router;
