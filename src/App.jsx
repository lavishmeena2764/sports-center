import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AllBookings from './pages/AllBookings';
import ScheduleBooking from './pages/ScheduleBooking';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <h1 className='mb-3'>Welcome to Sports Booking App</h1>
          <Routes>
            <Route path="/all-bookings" element={<AllBookings />} />
            <Route path="/schedule-booking" element={<ScheduleBooking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
