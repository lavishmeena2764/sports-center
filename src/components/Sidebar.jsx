import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Game Theory</h2>
      <h5>Sports Booking</h5>
      <ul className='mt-5'>
        <li><Link to="/all-bookings">View All Bookings</Link></li>
        <li><Link to="/schedule-booking">Schedule a Booking</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
