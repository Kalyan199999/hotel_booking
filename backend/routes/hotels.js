const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { addNewHotel,getAllHotel,getHotelById } = require('../controllers/hotels');

const router = express.Router();
router.post('/', auth, upload.array('images', 5), addNewHotel);

// Get all hotels (public)
router.get('/', getAllHotel);

// Get one hotel
router.get('/:id', getHotelById);

module.exports = router;
