import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to the Event Finder App</h1>
      <p>Find events and services near your location in real-time!</p>
      
      <div className='button-container'>
        <Link to="/login" className='button'>
          Login
        </Link>
        <Link to="/register" className='button'>
          Register
        </Link>
        <Link to="/map" className='button'>
          View Map
        </Link>
        <Link to="/create-event" className='create-event-link'>Create New Event</Link>
      </div>
    </div>
  );
}

export default Home;
