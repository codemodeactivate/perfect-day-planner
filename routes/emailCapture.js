const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
//const { app } = require('faker/lib/locales/en');
const emailSubscriberSend = controllers.emailCaptureController.captureEmail;



router.post('/subscribe', emailSubscriberSend);




module.exports = router;
