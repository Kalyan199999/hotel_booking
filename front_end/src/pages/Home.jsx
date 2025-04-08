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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Hotels</h1>
      {hotels.length === 0 ? (
        <p className="text-gray-600">No hotels found.</p>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel._id} className="border p-4 mb-4 rounded shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-blue-600 font-medium">${hotel.pricePerNight} / night</p>
            <Link
              to={`/hotels/${hotel._id}`}
              className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
