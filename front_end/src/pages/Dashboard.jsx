import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = user?.token;
        const res = await axios.get('http://localhost:5000/api/bookings/my', {
          headers: {
            Authorization: token,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.token) fetchBookings();
  }, [user]);

  if (!user) return <p className="text-center text-gray-600">Please login to view your bookings.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      {
          bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : 
          (
            bookings.map((b) => (
              <div key={b._id} className="border p-4 mb-4 rounded shadow">
                <h2 className="text-xl font-semibold">{b.hotel.name}</h2>
                <p>Check-In: {new Date(b.checkIn).toLocaleDateString()}</p>
                <p>Check-Out: {new Date(b.checkOut).toLocaleDateString()}</p>
                <p>Total: ${b.totalPrice}</p>
                <p>Status: {b.status}</p>
              </div>
            ))
          )
      }
    </div>
  );
};

export default Dashboard;
