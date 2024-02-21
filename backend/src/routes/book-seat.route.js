const router = require('express').Router();
const bookingController = require('../controllers/booking.controller');
// router.route('/book-seat').post(bookingController.book_seat);
router.route('/get-booking/:associate_id').get(bookingController.get_booking);
// router.route('/delete-booking').delete(bookingController.deleteBooking);
// router.route('/edit-booking').patch(bookingController.edit_booking);
router.route('/get-cancel-booking/:associate_id').get(bookingController.cancel_booking);
module.exports = router;