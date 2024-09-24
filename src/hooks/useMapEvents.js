import { useState, useEffect, useCallback } from 'react';
import { fetchNearbyEvents } from '../api/events';
import { useStore } from '../store/store'; // Zustand store

export const useMapEvents = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [eventType, setEventType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const setEvents = useStore((state) => state.setEvents); // Use Zustand action to set events
  const events = useStore((state) => state.events); // Access events from Zustand
  console.log('events:', events);

  const fetchEvents = useCallback(async (latitude, longitude, eventType, sortBy) => {
    setLoading(true);
    try {
      const data = await fetchNearbyEvents(latitude, longitude, eventType, sortBy);
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events.');
      setLoading(false);
    }
  }, [setEvents]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        fetchEvents(latitude, longitude, eventType, sortBy);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to fetch location.');
        setLoading(false);
      }
    );
  }, [eventType, sortBy, fetchEvents]);

  return {
    userLocation,
    events,
    eventType,
    setEventType,
    sortBy,
    setSortBy,
    error,
    loading,
  };
};
