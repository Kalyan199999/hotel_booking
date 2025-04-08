import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHotel();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to book');
      navigate('/login');
      return;
    }

    try {
      const token = user.token;
      await axios.post(
        'http://localhost:5000/api/bookings',
        {
          hotelId: id,
          checkIn,
          checkOut,
          guests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Booking successful!');
      navigate('/dashboard');
    } catch (err) {
      alert('Booking failed');
      console.error(err);
    }
  };

  if (!hotel) return <p className="text-center text-lg mt-10">Loading hotel details...</p>;

  console.log(hotel);
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Hotel Image */}
        <div className="rounded overflow-hidden shadow-lg">
          <img
            src={hotel.images[ 0 ] || 'https://via.placeholder.com/600x400'}
            alt={hotel.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Hotel Info + Booking */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-800">{hotel.name}</h1>
          <p className="text-gray-500 text-lg mb-1">{hotel.location}</p>
          <p className="text-xl font-semibold text-blue-600 mb-2">${hotel.pricePerNight} / night</p>
          <p className="text-gray-600 mb-4">{hotel.description}</p>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold">Amenities:</span>{' '}
            {hotel.amenities && hotel.amenities.join(', ')}
          </p>

          {/* Booking Form */}
          <form onSubmit={handleBooking} className="bg-gray-100 p-5 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold mb-2">Book This Hotel</h2>
            <div>
              <label className="block text-sm mb-1 font-medium">Check-In</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Check-Out</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Guests</label>
              <input
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
