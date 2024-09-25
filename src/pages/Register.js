import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister'; // Custom hook
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Importing eye icons
import '../styles/Register.css';
import logo from '../assets/custom_marker.png';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa'; // Importing arrow icon and spinner
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { error, handleRegister, loading } = useRegister();  // Use custom hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formData);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Link to="/" className="back-arrow">
        <FaArrowLeft size={24} /> {/* You can change the size if necessary */}
      </Link>
      <div className="register-container">
        <img src={logo} alt="Logo" className="register-logo" />
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={toggleShowPassword} className="password-toggle">
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? <FaSpinner className="spinners" /> : 'Register'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
