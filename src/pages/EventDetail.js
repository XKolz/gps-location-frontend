import React from 'react';
import { useParams } from 'react-router-dom';
import { useEventDetail } from '../hooks/useEventDetail';
import '../styles/EventDetail.css';

function EventDetail() {
  const { id } = useParams();  // Get event ID from URL
  const {
    event,
    reviews,
    newReview,
    setNewReview,
    newRating,
    setNewRating,
    submitReview,
    loading,
  } = useEventDetail(id);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div className="event-detail-container">
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
