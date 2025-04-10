const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const bookingRoutes = require('./routes/bookings');
const connectDB = require('./config/connectDB');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hotel Booking API running...');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port 5000')
  connectDB()
});






  