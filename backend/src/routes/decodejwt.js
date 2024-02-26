const decodejwt = require('../controllers/decodejwt');
const router = require('express').Router();

router.route('/').post(decodejwt.decodejwt);
module.exports = router;