const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  pricePerNight: { type: Number, required: true },
  amenities: [String],
  images: [String], // URLs or file paths
  rooms: Number,
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
