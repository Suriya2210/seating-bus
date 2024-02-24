import React, { useState, useEffect } from "react";
import "./BookSeatPage.css"; // Import CSS for BookSeatPage
import axios from "axios";

const BookSeatPage = () => {
  // State variables for form fields
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromHour, setFromHour] = useState("01");
  const [fromMinute, setFromMinute] = useState("00");
  const [fromTimePeriod, setFromTimePeriod] = useState("AM");
  const [toHour, setToHour] = useState("01");
  const [toMinute, setToMinute] = useState("00");
  const [toTimePeriod, setToTimePeriod] = useState("AM");

  useEffect(() => {
    // Fetch user details from the backend API (to be implemented later)
    axios
      .get("http://localhost:3000/api/get")
      .then((response) => {
        const userData = response.data;
        setUserName(userData.name);
        setEmail(userData.email);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder for saving form data to backend (to be implemented later)
    console.log("Form submitted:", {
      userName,
      email,
      phone,
      fromDate,
      toDate,
      fromHour,
      fromMinute,
      fromTimePeriod,
      toHour,
      toMinute,
      toTimePeriod,
    });
  };

  return (
    <div className="book-seat-page">
        <h2 className="bks-h2">Book Your Seat</h2>
      <div className="user-info">
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="form-group">
            <label htmlFor="userName">User Name:</label>
            <input type="text" id="userName" value={userName} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
      <div className="date-time-picker">
        <form onSubmit={handleSubmit} className="flex-row">
          <div className="form-group">
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              min={new Date().toISOString().split("T")[0]}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              min={fromDate}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fromTime">From Time:</label>
            <select
              id="fromHour"
              value={fromHour}
              onChange={(e) => setFromHour(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                <option key={hour} value={hour.toString().padStart(2, "0")}>
                  {hour.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            :
            <select
              id="fromMinute"
              value={fromMinute}
              onChange={(e) => setFromMinute(e.target.value)}
            >
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <option key={minute} value={minute.toString().padStart(2, "0")}>
                  {minute.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              id="fromTimePeriod"
              value={fromTimePeriod}
              onChange={(e) => setFromTimePeriod(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="toTime">To Time:</label>
            <select
              id="toHour"
              value={toHour}
              onChange={(e) => setToHour(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                <option key={hour} value={hour.toString().padStart(2, "0")}>
                  {hour.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            :
            <select
              id="toMinute"
              value={toMinute}
              onChange={(e) => setToMinute(e.target.value)}
            >
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <option key={minute} value={minute.toString().padStart(2, "0")}>
                  {minute.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              id="toTimePeriod"
              value={toTimePeriod}
              onChange={(e) => setToTimePeriod(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </form>
      </div>
      <div className="submit-button-container">
        <button type="submit" className="bsp-sb">
          Book Seat
        </button>
      </div>
    </div>
  );
};

export default BookSeatPage;
