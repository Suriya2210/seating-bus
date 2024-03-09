
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddNewUser.css"; // Import CSS for AddNewUser page
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import AdminToastMessage from '../Admin-ToastMessage'; // Import Toast Message

const AddNewUser = () => {

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Function to trigger toast message
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
      window.location.reload(); // Refresh the page after 3 seconds
    }, 3000);
  };

  const history = useHistory(); // Initialize useHistory
  const [formData, setFormData] = useState({
    associate_name: "",
    associate_id: 0,
    localsystemid: "",
    mobile_no: "",
    email: "",
    password: "",
    manager_id: "",
    manager_name: "",
    manager_email: "",
    direct_reports: 0,
    company: "",
    OpCo: "",
    ismanager: false,
    isAdmin: false,
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
      .post("http://localhost:3000/admin/add-user", formData, {
        headers: {
          Authorization: localStorage.getItem("jwt_token")
        }
      })
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
          // password: "",
          isAdmin: false,
          ismanager: false,
          manager_email: "",
          manager_name: "",
          mobile_no: "",
          direct_reports: "",
          company: "",
          OpCo: "",
        });
        // Send email to the user
        sendEmail(formData.associate_id);
      })
      .catch((error) => {
        console.log("Error saving user data:", error);
        setMessage("Error adding user. Please try again."); // Set error message
      });
    // .finally(() => {
    //   setLoading(false); // Set loading back to false after submission
    //   triggerToast("User Added successfully!"); // Trigger toast message on successful booking
    //   history.push('/admin/usermanagement')
    // });
  };

  // Function to send email to the user
  const sendEmail = (uid) => {
    axios.post(`http://localhost:3000/send-mail/${uid}`)
      .then((response) => {
        console.log("Email sent successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error sending email:", error);
      });
  };

  useEffect(() => {
    if (message === "User added successfully!") {
      setTimeout(() => {
        setMessage(""); // Clear the success message after 3 seconds
        history.push("/admin/usermanagement"); // Redirect to UserManagementPage
      }, 3000);
    }
  }, [message, history]);


  const handleCancel = () => {
    history.push("/admin/usermanagement"); // Redirect to UserManagementPage
    // history.push("/UserManagement/UserManagementPage");
  };

  return (
    <>
      {showToast && <AdminToastMessage message={toastMessage} />}
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
                  type="text"
                  name="mobile_no"
                  placeholder="Phone Number"
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
                  name="OpCo"
                  placeholder="Opco"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="addnewuser-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  required
                />
              </div> */}
            </div>
            <div className="right-column">
              <div className="addnewuser-group">
                <input
                  type="text"
                  name="manager_id"
                  placeholder="Manager ID"
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
                  type="email"
                  name="manager_email"
                  placeholder="Manager Email"
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
              {/* <div className="addnewuser-group">
                <input
                  type="text"
                  name="OpCo"
                  placeholder="Opco"
                  onChange={handleChange}
                  required
                />
              </div> */}
            </div>
          </div>
          <div className="submit-row">
            <button type="submit" className="submit-button">
              {loading ? "Adding User..." : "Add User"}
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
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
    </>
  );
};

export default AddNewUser;
