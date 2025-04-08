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
            Authorization: token,
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

  if (!hotel) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
      <p className="text-gray-600 mb-2">{hotel.location}</p>
      <p className="mb-2">Price: ${hotel.pricePerNight} / night</p>
      <p className="mb-6">Amenities: {hotel.amenities.join(', ')}</p>

      <form onSubmit={handleBooking} className="space-y-4 max-w-md">
        <h2 className="text-xl font-semibold">Book This Hotel</h2>
        <div>
          <label className="block">Check-In:</label>
          <input type="date" className="w-full border px-3 py-2 rounded" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
        </div>
        <div>
          <label className="block">Check-Out:</label>
          <input type="date" className="w-full border px-3 py-2 rounded" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
        </div>
        <div>
          <label className="block">Guests:</label>
          <input type="number" min="1" className="w-full border px-3 py-2 rounded" value={guests} onChange={(e) => setGuests(e.target.value)} required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Now</button>
      </form>
    </div>
  );
};

export default HotelDetails;
