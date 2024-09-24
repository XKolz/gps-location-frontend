import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

import { toast } from 'react-toastify';

export const useRegister = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    setError('');
    try {
      await registerUser(formData);
      toast.success('Registration successful!');
      navigate('/login');  // Redirect to login after successful registration
    } catch (err) {
      console.error('Error registering user:', err);
    //   setError('Registration failed. Please try again.');
      toast.error('Registration failed.');
    }
  };

  return {
    error,
    handleRegister,
  };
};
