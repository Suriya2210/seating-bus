import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: "smooth" });
};


const HeroSection = () => {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Your Comfort Awaits, Reserve Now</h1>
        <p className="hero-subtitle">
          Make seat reservations simple and straightforward.
        </p>
        <div className="hero-button">
          <button
            onClick={() => scrollToSection("user-bookseatsection")}
            className="HomePage-btn-1"
          >
            Manage Booking
          </button>
        </div>
        <div id="wrapper">
          <div id="wrapper-inner">
            <div id="scroll-down">
              <span class="arrow-down"></span>
              <span id="scroll-title">Scroll down</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Home = () => {
  return (
    <div className="content whole-body-home">
      <HeroSection />
      <div id="user-bookseatsection" className="section-manageseat">
        <h2 className="section-title">Book Your Seat!!</h2>
      </div>
    </div>
  );
};

export default Home;
