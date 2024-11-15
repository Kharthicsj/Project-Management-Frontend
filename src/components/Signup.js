import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch("https://projectmanagement-backend-k54l.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError(errorData.error || "Server error");
        setLoading(false); 
      } else {
        alert("Signup successful! Now you can log in."); 
        navigate("/login"); 
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="image-section"></div>
      <div className="form-section">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">
            {loading ? "Loading..." : "Sign Up"} {/* Show "Loading..." when loading */}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
