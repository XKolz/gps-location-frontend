import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';  // Custom hook for authentication
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Importing eye icons
import '../styles/Login.css';
import logo from '../assets/custom_marker.png';
import { FaArrowLeft } from 'react-icons/fa'; // Importing arrow icon
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { error, handleLogin } = useAuth();  // Use custom hook for login logic

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
        <Link to="/" className="back-arrow">
          <FaArrowLeft size={24} /> {/* You can change the size if necessary */}
        </Link>
    <div className="login-container">
       {/* <img src="../assets/custom-marker.png" alt="Logo" className="login-logo" />  */}
       <img src={logo} alt="Logo" className="login-logo" /> 
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}  {/* React Icons */}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;
