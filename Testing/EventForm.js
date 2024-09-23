import { render, screen, fireEvent } from '@testing-library/react';
import EventForm from './EventForm';

describe('EventForm', () => {
  test('should render form elements correctly', () => {
    render(<EventForm />);

    // Check if the input fields and button are rendered
    expect(screen.getByLabelText(/event name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument();
  });

  test('should call onSubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<EventForm onSubmit={handleSubmit} />);

    // Fill out form fields
    fireEvent.change(screen.getByLabelText(/event name/i), { target: { value: 'My Event' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'My Event Description' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create event/i }));

    // Check if handleSubmit was called
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
