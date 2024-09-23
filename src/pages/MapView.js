
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import "../styles/mapview.css"
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: require('./custom_marker.png'),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapView() {
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [eventType, setEventType] = useState(''); 
  const [sortBy, setSortBy] = useState(''); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        // Fetch nearby events with filters and sorting applied
        fetchEvents(latitude, longitude, eventType, sortBy);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to fetch location.');
        setLoading(false);
      }
    );
  }, [eventType, sortBy]);

  const fetchEvents = async (latitude, longitude, eventType = '', sortBy = '') => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/events/search/nearby', {
        params: {
          latitude,
          longitude,
          radius: 10,
          type: eventType,
          sort: sortBy,
        },
      });
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events.');
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="filters">
        <label htmlFor="eventType">Filter by Event Type: </label>
        <select id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="">All</option>
          <option value="restaurant">Restaurant</option>
          <option value="concert">Concert</option>
          <option value="repair_shop">Repair Shop</option>
        </select>

        <label htmlFor="sortBy">Sort by: </label>
        <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="distance">Distance</option>
          <option value="date">Date</option>
        </select>
      </div>

      {userLocation && (
        <MapContainer center={userLocation} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {events.map((event) => (
            <Marker
              key={event.id}
              position={[event.location.coordinates[1], event.location.coordinates[0]]}
              icon={customIcon}
            >
              <Popup>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Date:</strong> {new Date(event.date_time).toLocaleString()}</p>

                {/* Link to Event Detail Page */}
                <Link to={`/events/${event.id}`}>View Details & Reviews</Link>

                <button
                  onClick={() => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      alert('You need to login to bookmark events.');
                      return;
                    }
                    axios
                      .post(
                        'http://localhost:5000/api/auth/bookmark',
                        { eventId: event.id },
                        { headers: { Authorization: `Bearer ${token}` } }
                      )
                      .then(() => alert('Event bookmarked!'))
                      .catch((error) => console.error('Error bookmarking event:', error));
                  }}
                >
                  Bookmark
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default MapView;
