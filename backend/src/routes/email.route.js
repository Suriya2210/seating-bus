const express=require('express')
const router=express.Router();

const emailController = require('../controllers/email.controller');
router.route('/send-mail/:uid').post(emailController.sendMail);

module.exports = router;