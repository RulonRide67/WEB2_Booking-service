const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Public routes
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);

// Protected routes - admin only
router.post('/', auth, roleCheck, bookingController.createBooking);
router.put('/:id', auth, roleCheck, bookingController.updateBooking);
router.delete('/:id', auth, roleCheck, bookingController.deleteBooking);

module.exports = router;