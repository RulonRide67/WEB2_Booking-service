const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const { validateBooking, validateObjectIdParam } = require('../middleware/validate');

// Auth required routes
router.get('/', auth, bookingController.getAllBookings);
router.get('/:id', auth, validateObjectIdParam, bookingController.getBookingById);

// Protected routes - owner or admin
router.post('/', auth, validateBooking, bookingController.createBooking);
router.put('/:id', auth, validateObjectIdParam, validateBooking, bookingController.updateBooking);
router.delete('/:id', auth, validateObjectIdParam, bookingController.deleteBooking);

module.exports = router;
