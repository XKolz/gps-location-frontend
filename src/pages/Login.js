
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // For displaying login errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      navigate('/map'); // Redirect to the map page
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password. Please try again.'); // Display a user-friendly error
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
