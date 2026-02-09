const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateBooking, validateObjectIdParam } = require('../middleware/validate');

// Public routes
router.get('/', bookingController.getAllBookings);
router.get('/:id', validateObjectIdParam, bookingController.getBookingById);

// Protected routes - admin only
router.post('/', auth, roleCheck, validateBooking, bookingController.createBooking);
router.put('/:id', auth, roleCheck, validateObjectIdParam, validateBooking, bookingController.updateBooking);
router.delete('/:id', auth, roleCheck, validateObjectIdParam, bookingController.deleteBooking);

module.exports = router;
