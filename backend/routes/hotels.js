const express = require('express');
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('images'), async (req, res) => {
  
  try {
    
    const obj = req.body


    const name = obj.name
    const location = obj.location;
    const description = obj.description;
    const pricePerNight = obj.pricePerNight;
    const amenities = obj.amenities.split(',');
    
    const imagePaths = []
    
    const newHotel = new Hotel({
      name,
      description,
      location,
      pricePerNight,
      amenities:amenities,
      images: imagePaths,
    });

    console.log(newHotel);
    

    const savedHotel = await newHotel.save();

    res.status(201).json(savedHotel);

  } catch (err) {
    console.log("error");
    
    res.status(500).json({ error: err.message });
  }
});



// Get all hotels (public)
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one hotel
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
