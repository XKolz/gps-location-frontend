import { useState } from 'react';
import { useStore } from '../store/store';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [error, setError] = useState('');
  const setToken = useStore((state) => state.setToken); // Zustand action
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    setError('');
    try {
      const data = await loginUser(formData);
      setToken(data.token);  // Save token in Zustand store
      toast.success('Logged in successfully!');
      navigate('/map');
    } catch (err) {
      console.error('Error logging in:', err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return {
    error,
    handleLogin,
  };
};
