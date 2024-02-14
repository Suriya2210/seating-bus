import React, { useState } from 'react';
import './EditUserPopup.css';
import axios from 'axios';

const EditUserPopup = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Make PUT request to save edited user data
    axios.patch(`http://localhost:3000/admin/edit-user/${editedUser.associate_id}`, editedUser)
      .then(response => {
        // Handle successful save
        console.log("User data updated successfully:", response.data);
        onSave(editedUser); // Pass the updated user data to the parent component
      })
      .catch(error => {
        // Handle error
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div className="edit-user-popup">
      <h2>Edit User</h2>
      <form>
        <label>
          Associate ID:
          <input type="text" name="associate_id" value={editedUser.associate_id} onChange={handleChange} readOnly />
        </label>
        <label>
          Associate Name:
          <input type="text" name="associate_name" value={editedUser.associate_name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={editedUser.email} onChange={handleChange} readOnly />
        </label>
        <div className="buttons">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPopup;
