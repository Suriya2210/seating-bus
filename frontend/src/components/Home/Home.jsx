

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Home.css";
import { useTabContext } from "@material-ui/lab";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = ({ handleDateChange, pickedDate }) => {


  const [date, setdate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    console.log(today)
    setdate(today);
  }, []);

  const handlechange = (event) => {
    setdate(event.target.value);
  }
  // Get today's date in the format "YYYY-MM-DD"
  const today = new Date().toISOString().split('T')[0];
  return (
    <header className="userhome-hero">
      <div className="userhome-hero-content">
        <h1 className="userhome-hero-title">Your Comfort Awaits, Reserve Now</h1>
        <p className="userhome-hero-subtitle">
          Make seat reservations simple and straightforward.
        </p>
        <div className="home-seatlayout-gad">
          {/* <DatePicker
            selected={pickedDate}
            onChange={handleDateChange}
            id="date_picker"
            placeholderText="Select Date"
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            className="date-picker"
          /> */}
          <input type="date" id="date_picker" className="date-picker" value={date} selected={pickedDate} min={today} onChange={handlechange} />

          <Link
            to={{ pathname: "./seatlayout", state: { selecteddate: date } }
            }
            className="book-seat-link"
          >
            Book Seat
          </Link>

        </div>
      </div>
    </header>
  );
};

const Home = () => {
  const [pickedDate, setPickedDate] = useState(null);
  const history = useHistory();

  const handleDateChange = (date) => {
    setPickedDate(date);
  };

  return (
    <div className="content whole-body-home">
      <HeroSection handleDateChange={handleDateChange} pickedDate={pickedDate} />
    </div>
  );
};

export default Home;
