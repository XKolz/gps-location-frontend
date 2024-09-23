import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EventCreation.css';

function EventCreation() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [message, setMessage] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Use Geolocation API to automatically fill latitude and longitude
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoadingLocation(false);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setMessage('Unable to get your location. Please fill in the coordinates manually.');
          setLoadingLocation(false);
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // const token = localStorage.getItem('token');
    const token = localStorage.getItem('token');
// console.log('Token:', token);

    if (!token) {
      setMessage('You need to log in to create an event.');
      return;
    }

    // try {
    //   const response = await axios.post(
    //     'http://localhost:5000/api/events', // Ensure this route is correct in your backend
    //     {
    //       name,
    //       type,
    //       address,
    //       latitude: parseFloat(latitude), // Convert to float
    //       longitude: parseFloat(longitude), // Convert to float
    //       description,
    //       date_time: dateTime,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   setMessage('Event created successfully!');
    //   navigate('/map');
    // } catch (error) {
    //   console.error('Error creating event:', error);
    //   setMessage('Failed to create the event. Please try again.');
    // }

    try {
        const response = await axios.post(
          'http://localhost:5000/api/events',
          {
            name,
            type,
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            description,
            date_time: dateTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        // You can now use response data if needed
        console.log('Event created:', response.data); // Logs event creation success details
        setMessage('Event created successfully!');
        navigate('/map');
      } catch (error) {
        console.error('Error creating event:', error);
        setMessage('Failed to create the event. Please try again.');
      }
      
  };

  return (
    <div className='event-creation-container'>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Type:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        {/* Latitude and Longitude fields, auto-filled if location is available */}
        <div>
          <label>Latitude:</label>
          <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Date and Time:</label>
          <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
        </div>

        {loadingLocation && <p>Fetching your location...</p>}
        <button type="submit" disabled={loadingLocation}>Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EventCreation;
