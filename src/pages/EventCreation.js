import React from 'react';
import { useEventCreation } from '../hooks/useEventCreation'; // Custom hook
import '../styles/EventCreation.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function EventCreation() {
  const {
    name, setName, type, setType, address, setAddress,
    latitude, setLatitude, longitude, setLongitude,
    description, setDescription, dateTime, setDateTime,
    message, loadingLocation, handleSubmit
  } = useEventCreation(); // Use custom hook for event creation logic

  return (
    <>
      {/* Back arrow link */}
      <Link to="/" className="back-arrow">
        <FaArrowLeft size={24} /> {/* You can change the size if necessary */}
      </Link>
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

        {loadingLocation && <p style={{ color: 'green', fontWeight: 'bold' }}>Fetching your location...</p>}
        <button type="submit" disabled={loadingLocation}>Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </>
  );
}

export default EventCreation;
