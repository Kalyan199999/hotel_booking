const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const { newBooking,userBooking,adminBooking } = require('../controllers/allBookings');

// Create a booking
router.post('/', auth, newBooking);

// Get user's bookings
router.get('/my', auth, userBooking);

// Admin: get all bookings
router.get('/', auth, adminBooking);

module.exports = router;
