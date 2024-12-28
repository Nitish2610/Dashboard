import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <p>
            CP PLUS IntelliServe is your trusted platform for secure and seamless installation services. We prioritize reliability and customer satisfaction.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: support@cpplus.com</p>
          <p>Phone: +1 123-456-7890</p>
          <p>Address: 123 IntelliServe Lane, New York, NY</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com" target='_blank'><i className="fab fa-facebook"></i></a>
            <a href="https://www.twitter.com" target='_blank'><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com" target='_blank'><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com" target='_blank'><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 CP PLUS IntelliServe | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
