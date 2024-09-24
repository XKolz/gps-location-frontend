import axios from '../config/axiosConfig';

export const createEvent = async (eventData, token) => {
  const response = await axios.post('/events', eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getEventDetails = async (id) => {
  const response = await axios.get(`/events/${id}`);
  return response.data;
};

export const getEventReviews = async (id) => {
  const response = await axios.get(`/reviews/${id}`);
  return response.data;
};

export const submitEventReview = async (reviewData, token) => {
  const response = await axios.post('/reviews', reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchNearbyEvents = async (latitude, longitude, eventType = '', sortBy = '') => {
  const response = await axios.get('/events/search/nearby', {
    params: {
      latitude,
      longitude,
      radius: 10,
      type: eventType,
      sort: sortBy,
    },
  });
  return response.data;
};

export const bookmarkEvent = async (eventId, token) => {
  const response = await axios.post(
    '/auth/bookmark',
    { eventId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};