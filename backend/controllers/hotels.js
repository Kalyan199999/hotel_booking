
const Hotel = require('../models/Hotel');

const addNewHotel = async (req, res) => {

  try {

    console.log("post Hotel");

    if( req.body.name === '' || req.body.location === "" || req.body.pricePerNight === "" )
    {
      return res.status(201).json( {message: "Please fill all the fields" } )
    }

    const { name,description, location, pricePerNight,amenities} = req.body;

    const amenitiesArray = Array.isArray(amenities) 
      ? amenities 
      : amenities.split(',').map(item => item.trim());

    // console.log(name+" "+description+" "+location+" "+pricePerNight);
    // console.log(amenitiesArray);
    

    const fileUrls = req.files.map(file=> file);

    // console.log(fileUrls);
    

    const newHotel = new Hotel({
      name,
      location,
      description,
      pricePerNight,
      amenities:amenitiesArray,
      images:fileUrls
    });

    const savedHotel = await newHotel.save();
    // console.log(savedHotel);
    
    return res.status(201).json("savedHotel");
    
  } catch (error) {

    return res.status(500).json({message: error.message});
    
  }


}

  const getAllHotel = async (req, res) => {
    try {
      const hotels = await Hotel.find();
      return res.status(200).json(hotels);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const getHotelById  = async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      return res.status(200).json(hotel);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  module.exports = { addNewHotel,getAllHotel,getHotelById }