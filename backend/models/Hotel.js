const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  pricePerNight: { type: Number, required: true },
  amenities: [String],
  images:  [{
    path: String,
    filename: String,
    originalName: String,
    destination:String,
    fieldname:String,
    createdAt: { type: Date, default: Date.now }
  }],
  rooms: {type:Number , default1:1},
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
