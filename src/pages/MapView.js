import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import "../styles/mapview.css";
import { useMapEvents } from '../hooks/useMapEvents'; // Custom hook
import { toast } from 'react-toastify';
import { bookmarkEvent } from '../api/events'; // Bookmark API
import ClipLoader from 'react-spinners/ClipLoader';
import { FaArrowLeft } from 'react-icons/fa';

const customIcon = new L.Icon({
  iconUrl: require('../assets/custom_marker.png'),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapView() {
  const {
    userLocation,
    events,
    eventType,
    setEventType,
    sortBy,
    setSortBy,
    error,
    loading,
  } = useMapEvents(); // Use custom hook

  const handleBookmark = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // alert('You need to log in to bookmark events.');
      toast.warn('You need to log in to bookmark events.');
      return;
    }

    try {
      await bookmarkEvent(eventId, token);
      // alert('Event bookmarked!');
      toast.success('Event bookmarked!');
    } catch (error) {
      console.error('Error bookmarking event:', error);
      toast.error('Failed to bookmark event.');
    }
  };

if (loading) {
  return (
    <div className="spinner">
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
}

  if (error) return <p>{error}</p>;

  return (
    <div>
        {/* Back arrow link */}
        <Link to="/" className="back-arrow">
          <FaArrowLeft size={24} /> {/* You can change the size if necessary */}
        </Link>
      <div className="filters">
        <label htmlFor="eventType">Filter by Event Type: </label>
        <select style={{ width: '200px' }} id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="">All</option>
          <option value="restaurant">Restaurant</option>
          <option value="concert">Concert</option>
          <option value="repair_shop">Repair Shop</option>
        </select>

        <label htmlFor="sortBy">Sort by: </label>
        <select style={{ width: '200px' }} id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
              <Popup className="custom-popup">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Date:</strong> {new Date(event.date_time).toLocaleString()}</p>

                <Link to={`/events/${event.id}`}>View Details & Reviews</Link>

                <button onClick={() => handleBookmark(event.id)}>Bookmark</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default MapView;
