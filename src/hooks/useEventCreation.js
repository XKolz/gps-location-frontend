import { useState, useEffect } from 'react';
import { createEvent } from '../api/events';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useEventCreation = () => {
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
    // Automatically fetch user's geolocation
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

    const token = localStorage.getItem('token');

    if (!token) {
    //   setMessage('You need to log in to create an event.');
      toast.warn('You need to log in to create an event.');
      return;
    }

    const eventData = {
      name,
      type,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description,
      date_time: dateTime,
    };

    try {
      await createEvent(eventData, token);
    //   setMessage('Event created successfully!');
      toast.success('Event created successfully!');
      navigate('/map');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create the event. Please try again.');
    //   setMessage('Failed to create the event. Please try again.');
    }
  };

  return {
    name,
    setName,
    type,
    setType,
    address,
    setAddress,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    description,
    setDescription,
    dateTime,
    setDateTime,
    message,
    loadingLocation,
    handleSubmit,
  };
};
