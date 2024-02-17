import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./UserManagementPage.css";
import axios from "axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import SeatComponent from "../../SeatComponent/SeatComponent.jsx";
const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAssociateId, setSelectedAssociateId] = useState(null); // New state variable for storing the selected associate ID
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("jwt_token");
  console.log("JWT TOKEN "+token);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/get-users",{
        headers: {
          Authorization: token.toString()
        }
      })
      .then((response) => {
        setUsers(response.data.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    user.associate_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current page of users based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Event handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  var handleEditUser = (user) => {
    setSelectedUser(user);
    setSelectedAssociateId(user.associate_id); // Set the selected associate ID
    setShowEditPopup(true);
  };

  var handleSaveUser = (editedUser) => {
    // Save edited user details to the backend (to be implemented later)
    // For now, update the user in the local state
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === editedUser.id ? editedUser : u))
    );
    setShowEditPopup(false);
  };

  var handleCancelEdit = () => {
    setShowEditPopup(false);
  };

  var handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true); // Show the delete confirmation popup
  };
  
  var confirmDelete = () => {
    // Make a DELETE request to delete the user using the API
    axios
      .delete(`http://localhost:3000/admin/delete-user/${userToDelete.associate_id}`)
      .then(() => {
        // If the request is successful, remove the user from the local state
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelete.id));
        setShowDeleteConfirmation(false); // Close the delete confirmation popup
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error deleting user:", error);
      });
  };
  
  var cancelDelete = () => {
    setShowDeleteConfirmation(false); // Close the delete confirmation popup without deleting
  };
  

  // Other event handlers (handleEditUser, handleSaveUser, handleDeleteUser, etc.)
  
  


  return (
    <SeatComponent></SeatComponent>
  );
};

export default UserManagementPage;
