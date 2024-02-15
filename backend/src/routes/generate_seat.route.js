const express=require('express')
const router=express.Router();

const generate_seat_controller = require('../controllers/generate_seat.controller')


router.route('/').post(generate_seat_controller.generate);


module.exports = router;