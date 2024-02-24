import React from 'react';
import './Admin-ToastMessage.css';

const AdminToastMessage = ({ message }) => {
    return (
        <div className="Admin-toast-container">
            <div className="Admin-toast">{message}</div>
        </div>
    );
};

export default AdminToastMessage;
