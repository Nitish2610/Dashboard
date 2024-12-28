import React, { useState } from "react";
import "./ForgotPassword.css";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    // Add logic to send the reset link
  };

  return (
    <>
    <Navbar/>
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p className="instructions">
          Enter your registered email address to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="reset-btn">
            Send Reset Link
          </button>
        </form>
        <p className="login-link">
          Remember your password? <a href="/login">Login</a>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ForgotPassword;
