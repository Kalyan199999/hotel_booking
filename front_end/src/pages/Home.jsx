import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hotels');
        setHotels(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Explore Our Hotels</h1>

      {hotels.length === 0 ? (
        <p className="text-gray-600 text-center">No hotels found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden "
            >
              <img
                src={hotel.images[0] || 'https://via.placeholder.com/400x250'}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">{hotel.name}</h2>
                <p className="text-gray-500 mb-1">{hotel.location}</p>
                <p className="text-blue-600 font-medium mb-4">${hotel.pricePerNight} / night</p>
                <Link
                  to={`/hotels/${hotel._id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
