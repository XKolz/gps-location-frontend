import React from 'react';
import { useParams } from 'react-router-dom';
import { useEventDetail } from '../hooks/useEventDetail';
import '../styles/EventDetail.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaArrowLeft, FaStar } from 'react-icons/fa'; // Import star icons
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

function EventDetail() {
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div className="spinner">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }
  if (!event) return <p>Event not found</p>;

  // Helper to render stars based on the rating value
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        size={24}
        color={i < rating ? '#ffc107' : '#e4e5e9'}
        onClick={() => setNewRating(i + 1)} // Set rating on star click
        style={{ cursor: 'pointer' }}
      />
    ));
  };

  return (
    <>
      {/* Back arrow link */}
      <Link className="back-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft size={24} /> {/* You can change the size if necessary */}
      </Link>
      <div className="event-detail-container">
        <h2>{event.name}</h2>
        <p style={{fontSize: '18px'}}>{event.description}</p>
        <p>Type: {event.type}</p>
        <p>Date: {new Date(event.date_time).toLocaleString()}</p>
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          <div
            className={`review-list ${reviews.length > 4 ? 'scrollable' : ''}`}
          >
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p>Rating: {renderStars(review.rating)}</p>
                  <p>Comment: {review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
        <h3>Leave a Review</h3>
        <div>
          <label>Rating: </label>
          <div>{renderStars(newRating)}</div> {/* Render stars for rating input */}
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
    </>
  );
}

export default EventDetail;
