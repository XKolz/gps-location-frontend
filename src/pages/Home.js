import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store'; // Import Zustand store
import { toast } from 'react-toastify';
import '../styles/Home.css';

function Home() {
  const token = useStore((state) => state.token); // Get token from Zustand store
  const clearToken = useStore((state) => state.clearToken); // Get the action to clear token
  const navigate = useNavigate(); // React Router's navigate function

  const handleLogout = () => {
    clearToken(); // Clear the token in Zustand
    toast.info('Logged out successfully!');
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="container">
      <h1>Welcome to the Event Finder App</h1>
      <span style={{ fontSize: '20px', color: '#dde7f0', fontWeight: 'bold' }}>Find events and services near your location in real-time!</span>

      <div className='button-container'>
        {!token ? (
          <>
            {/* Show Login, Register and View Map if not logged in */}
            <Link to="/map" className='button'>
              View Map
            </Link>
            <Link to="/login" className='button'>
              Login
            </Link>
            <Link to="/register" className='button'>
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Show View Map, Create Event, and Logout if logged in */}
            <Link to="/map" className='button'>
              View Map
            </Link>
            <Link to="/create-event" className='create-event-link'>
              Create New Event
            </Link>
            <button onClick={handleLogout} className='button-logout'>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
