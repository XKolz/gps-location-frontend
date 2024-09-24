import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MapView from './pages/MapView';
import Home from './pages/Home';
import Register from './pages/Register';
import EventDetail from './pages/EventDetail'; // Import EventDetail component
import PrivateRoute from './middleware/PrivateRoute'; 
import PublicRoute from './middleware/PublicRoute';
import EventCreation from './pages/EventCreation'; // Import PrivateRoute component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
        {/* Wrap Login and Register with PublicRoute */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path='/map' element={<MapView />} />
       {/* Wrap protected routes with PrivateRoute */}
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
      {/* Add this route */}
    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
