import { useState, useEffect } from 'react';
import { getEventDetails, getEventReviews, submitEventReview } from '../api/events';
import { toast } from 'react-toastify';

export const useEventDetail = (id) => {
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await getEventDetails(id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    const fetchReviewData = async () => {
      try {
        const reviewsData = await getEventReviews(id);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchEventData();
    fetchReviewData();
    setLoading(false);
  }, [id]);

  const submitReview = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn('You need to log in to leave a review.');
      return;
    }

    const reviewData = {
      rating: newRating,
      comment: newReview,
      eventId: id,
    };

    try {
      const submittedReview = await submitEventReview(reviewData, token);

      toast.success('Review submitted successfully!');
      
      // Update the review list with the new review
      setReviews((prevReviews) => [...prevReviews, submittedReview]);

      // Clear the form fields
      setNewReview('');
      setNewRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review.');
    }
  };

  return {
    event,
    reviews,
    newReview,
    setNewReview,
    newRating,
    setNewRating,
    submitReview,
    loading,
  };
};
