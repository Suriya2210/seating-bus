import React, { useState } from "react";
import axios from "axios";
import "./AddNewUser.css"; // Import CSS for AddNewUser page

const AddNewUser = () => {
  const [formData, setFormData] = useState({
    associate_name: "",
    associate_id:0,
    localsystemid: "",
    email: "",
    manager_id: "",
    password:"varsan",
    isAdmin:false,
    ismanager:false,
    manager_email: "",
    manager_name: "",
    direct_reports: 0,
    company: "",
    OpCo: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Parse associate_id and direct_reports to integers if they are numbers
    const parsedValue = name === "associate_id" || name === "direct_reports" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    console.log(formData);
    axios
      .post("http://localhost:3000/admin/add-user", formData)
      .then((response) => {
        console.log("User data saved successfully:", response.data);
        setMessage("User added successfully!"); // Set success message
        // Clear input fields after successful submission
        setFormData({
          associate_name: "",
          associate_id: "",
          localsystemid: "",
          email: "",
          manager_id: "",
          password:"",
          isAdmin:false,
          ismanager:false,
          manager_email: "",
          manager_name: "",
          direct_reports: "",
          company: "",
          OpCo: "",
        });
      })
      .catch((error) => {
        console.log("Error saving user data:", error);
        setMessage("Error adding user. Please try again."); // Set error message
      })
      .finally(() => {
        setLoading(false); // Set loading back to false after submission
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  return (
    <div className="add-user-page">
      <h2 className="add-user-header">Add New User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-row">
          <div className="left-column">
            <div className="addnewuser-group">
              <input
                type="text"
                name="associate_name"
                placeholder="Associate Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addnewuser-group">
              <input
                type="number"
                name="associate_id"
                placeholder="Associate ID"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addnewuser-group">
              <input
                type="text"
                name="localsystemid"
                placeholder="Local System ID"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addnewuser-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addnewuser-group">
              <input
                type="text"
                name="manager_id"
                placeholder="Manager ID"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="right-column">
            <div className="addnewuser-group">
              <input
                type="email"
                name="manager_email"
                placeholder="Manager Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addnewuser-group">
              <input
                type="text"
                name="manager_name"
                placeholder="Manager Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addnewuser-group">
              <input
                type="number"
                name="direct_reports"
                placeholder="Direct Report"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addnewuser-group">
              <input
                type="text"
                name="company"
                placeholder="Company"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addnewuser-group">
              <input
                type="text"
                name="OpCo"
                placeholder="Opco"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="submit-row">
          <button type="submit" className="submit-button">
            {loading ? "Adding User..." : "Add User"}
          </button>
        </div>
      </form>
      {message && (
        <div
          className={`message ${message.startsWith("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddNewUser;
