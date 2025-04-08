import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center mb-6">
      
      <div className="space-x-4">
        <Link to="/" className="text-lg font-semibold text-blue-600 hover:underline">Home</Link>
        {user && <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>}
      </div>
      
      <div className="space-x-4">
        {
            user ? (
              <>
                <span className="text-gray-700">Hi, {user.user.name}</span>
                <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
              </>
            )
        }
      </div>
    </nav>
  );
};

export default Navbar;
