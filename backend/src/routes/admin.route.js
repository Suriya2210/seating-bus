// const router = require('express').Router();
// const adminController = require('../controllers/admin.controller');
// const { asyncHandler } = require('../middlewares/asyncHandler');
// const checkEmail = require('../middlewares/checkEmail');
// const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
// router.route('/add-user').post(adminController.addUser);
// router.route('/get-users').get(adminController.getUsers);
// router.route('/get-user').get(adminController.getUser);
// router.route('/edit-user').patch(adminController.editUser);
// router.route('/delete-user').delete(adminController.deleteUser);
// module.exports = router;





const router = require('express').Router();
const adminController = require('../controllers/admin.controller')
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
router.route('/add-user').post(adminController.addUser);
router.route('/get-users').get(adminController.getUsers);
router.route('/get-user/:id').get(adminController.getUser);
router.route('/edit-user/:id').patch(adminController.editUser);
router.route('/delete-user/:id').delete(adminController.deleteUser);
module.exports = router;