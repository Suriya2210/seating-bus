// src/services/userService.js

import axios from 'axios'; // Import axios for making HTTP requests
import { urlConstants } from "../constants"; // Import URL constants

export const userService = {
    getUsers,
    deleteUser,
};

// Function to fetch users from the backend
function getUsers() {
    return axios.get(urlConstants.USERS) // Assuming your backend API endpoint for fetching users is stored in urlConstants.USERS
        .then(response => response.data) // Extract data from response
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error; // Throw error for handling in components
        });
}

// Function to delete a user by ID
function deleteUser(userId) {
    return axios.delete(`${urlConstants.USERS}/${userId}`) // Assuming your backend API endpoint for deleting a user is stored in urlConstants.USERS and accepts DELETE method
        .catch(error => {
            console.error('Error deleting user:', error);
            throw error; // Throw error for handling in components
        });
}
