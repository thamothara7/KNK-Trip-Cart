const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createBooking).get(protect, getBookings);
router.route('/:id/status').put(protect, updateBookingStatus);

module.exports = router;
