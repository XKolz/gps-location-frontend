import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MapView from './pages/MapView';
import Home from './pages/Home';
import Register from './pages/Register';
import EventDetail from './pages/EventDetail'; // Import EventDetail component
import PrivateRoute from './middleware/PrivateRoute'; 
import EventCreation from './pages/EventCreation'; // Import PrivateRoute component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route
        path="/map"
        element={
          <PrivateRoute>
            <MapView />
          </PrivateRoute>
        }
      /> */}
      <Route path='/map' element={<MapView />} />
      <Route
        path="/create-event"
        element={
          <PrivateRoute>
            <EventCreation />
          </PrivateRoute>
        }
      />
      <Route 
        path="/events/:id" 
        element={
          <PrivateRoute>
            <EventDetail />
          </PrivateRoute>
        } 
      />
      {/* <Route path="/events/:id" element={<EventDetail />} />  */}
      {/* Add this route */}

    </Routes>
  );
}

export default App;
