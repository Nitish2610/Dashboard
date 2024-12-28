import React from "react";
import "./About.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="about-us-container">
      <div className="about-us-box">
        <h2>About Us</h2>
        <p className="about-description">
          Welcome to <strong>YourWebsite</strong>, where we strive to provide the best user
          experience. Our mission is to deliver high-quality solutions tailored
          to your needs. We believe in innovation, excellence, and customer
          satisfaction.
        </p>
        <p className="about-description">
          Established in 2020, we have served over 10,000 clients globally.
          Explore our website to know more about our services and how we can
          help you achieve your goals.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
