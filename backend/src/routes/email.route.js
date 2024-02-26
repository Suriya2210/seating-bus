const express=require('express')
const router=express.Router();

const emailController = require('../controllers/email.controller');
router.route('/send-mail/:uid').post(emailController.sendMail);
router.route('/booking-success').post(emailController.bookingSucessMail);

module.exports = router;