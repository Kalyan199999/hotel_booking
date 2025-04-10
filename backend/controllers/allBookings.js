const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');


const newBooking = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * hotel.pricePerNight;

    const booking = new Booking({
      user: req.user.id,
      hotel: hotelId,
      checkIn,
      checkOut,
      guests,
      totalPrice
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const userBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('hotel');
    res.json(bookings);
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