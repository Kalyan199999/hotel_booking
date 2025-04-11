import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const sample_obj = {
  name: '',
  description: '',
  location: '',
  pricePerNight: '',
  amenities: '',
  images: [], // updated from `image`
}

const AddHotel = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState(sample_obj);
 
//  if( user ){
//   console.log(user.user.role);
//  }


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    
    if (name === 'images') {

      console.log(files);
      
      setForm({ ...form, images: files[0]}); // multiple files
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url ='http://localhost:5000/api/hotels'

    // console.log(form);

    try {
      const res = await axios.post(url, form, {
        
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: user.token
        },
      });

      alert('Hotel added successfully!');
      // console.log(res);

      setForm( sample_obj )

      
    } catch (err) {
      console.error('err');
      alert('Failed to add hotel');
    }
  };

  // if u r not a admin u cant add a hotel
  if( user && user.user.role !== 'admin' ) return <h1 className='text-2xl text-center mt-10 text-red-500'> U r Not an Admin </h1>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add New Hotel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="pricePerNight" type="number" placeholder="Price per Night" value={form.pricePerNight} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="amenities" placeholder="Amenities (comma-separated)" value={form.amenities} onChange={handleChange} required className="w-full border p-2 rounded" />
        
       

      <input 
       name="images"
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />  

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
