import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);  // Start loading when login process begins

    try {
      const response = await fetch('https://projectmanagement-backend-k54l.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      setIsLoading(false);  // Stop loading once the response is received

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
        alert(`Login failed: ${errorData.error}`);
      } else {
        const data = await response.json();
        console.log('Login successful:', data);

        // Store the token in localStorage for session persistence
        localStorage.setItem('authToken', data.token);

        // Redirect to the home page after successful login
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      setIsLoading(false);  // Stop loading on error
      console.error('Login request failed:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <div className="container">
      <div className="image-section"></div>
      <div className="form-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>   {/* Disable button while loading */}
            {isLoading ? 'Loading...' : 'Login'}  {/* Display loading text when in progress */}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Create one here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
