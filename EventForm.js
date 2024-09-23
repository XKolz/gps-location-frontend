import React from 'react';

const EventForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="eventName">Event Name</label>
      <input id="eventName" name="eventName" type="text" />

      <label htmlFor="eventDescription">Description</label>
      <textarea id="eventDescription" name="eventDescription" />

      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
