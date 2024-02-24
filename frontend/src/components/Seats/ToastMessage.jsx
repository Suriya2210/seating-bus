import React from 'react';
import './ToastMessage.css';

const ToastMessage = ({ message }) => {
    return (
        <div className="Seat-toast-container">
            <div className="Seat-toast">{message}</div>
        </div>
    );
};

export default ToastMessage;
