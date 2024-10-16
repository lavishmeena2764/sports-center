import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, onBook, onFailure }) => {
  // const [court, setCourt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
      onBook();
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content" style={{width:"20rem"}}>
        <h3>Confirm Booking</h3>
          {/* <label>Select Court:</label>
          <select value={court} onChange={(e) => setCourt(e.target.value)}>
            <option value="">-- Select a Court --</option>
            <option value="Court 1">Court 1</option>
            <option value="Court 2">Court 2</option>
          </select> */}
          <div className='flex flex-row justify-between'><button className="primary-btn mx-4" onClick={handleSubmit}>Book</button>
          <button className="close-btn mx-4" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
};

export default BookingModal;
