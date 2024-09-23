import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/EventDetail.css';

function EventDetail() {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching event reviews:', error);
      }
    };

    fetchEvent();
    fetchReviews();
  }, [id]);

  const submitReview = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in to leave a review.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/reviews',
        { rating: newRating, comment: newReview, eventId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Review submitted!');
      // fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className='event-detail-container'>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Type: {event.type}</p>
      <p>Date: {new Date(event.date_time).toLocaleString()}</p>

      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      <h3>Leave a Review</h3>
      <div>
        <label>Rating: </label>
        <select value={newRating} onChange={(e) => setNewRating(e.target.value)}>
          <option value={0}>Select rating</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <label>Comment: </label>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here"
        />
      </div>
      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
}

export default EventDetail;
