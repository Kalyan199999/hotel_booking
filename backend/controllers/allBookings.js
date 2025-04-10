const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const User = require('../models/User');


const newBooking = async (req, res) => {
  try {
    const { userId , hotelId, checkIn, checkOut, guests,totalPrice } = req.body;

    // console.log(req.body);
    
    const hotel = await Hotel.findOne(hotelId);
    const user = await User.findOne(userId);
    
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    // totalPrice = totalPrice * nights;

    const booking = new Booking({
      user: user._id,
      hotel: hotel._id,
      checkIn,
      checkOut,
      guests,
      totalPrice
    });
    
    // console.log(booking);

    const d = await booking.save();

    console.log(d);

    res.status(200).json("booked");

  } 
  catch (err) 
  {
    res.status(500).json({ error: "Booking Failed" });
  }
}



const userBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('hotel');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const adminBooking = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      const bookings = await Booking.find().populate('user hotel');
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


module.exports = {
  newBooking,
  userBooking,
  adminBooking
}