import React, { useState, useEffect } from 'react';
import BookingModal from '../components/BookingModal.jsx';
import './ScheduleBooking.css';

const ScheduleBooking = () => {
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [sports, setSports] = useState([]);
  const [courts, setCourts] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Fetch the data from the JSON file
  useEffect(() => {
    fetch('/centers.json')
      .then((response) => response.json())
      .then((data) => setCenters(data.centers))
      .catch((error) => console.error('Error fetching centers:', error));
  }, []);

  // Update sports when a center is selected
  useEffect(() => {
    if (selectedCenter) {
      const center = centers.find((c) => c.name === selectedCenter);
      setSports(center ? center.sports : []);
      setSelectedSport('');
      setSelectedCourt('');
      setAvailableTimeSlots([]);
    }
  }, [selectedCenter, centers]);

  // Update courts when a sport is selected
  useEffect(() => {
    if (selectedSport) {
      const sport = sports.find((s) => s.name === selectedSport);
      setCourts(sport ? sport.courts : []);
      setSelectedCourt('');
      setAvailableTimeSlots([]);
    }
  }, [selectedSport, sports]);

  // Update available time slots when a court is selected
  useEffect(() => {
    if (selectedCourt) {
      const court = courts.find((c) => c.courtName === selectedCourt);
      setAvailableTimeSlots(court ? court.timeSlots : []);
      setSelectedTimeSlot('');
    }
  }, [selectedCourt, courts]);

  const handleScheduleClick = () => {
    if (!selectedCenter || !selectedSport || !selectedCourt || !selectedDate || !selectedTimeSlot) {
      setAlertMessage('Please select all fields (center, sport, court, date, and time slot)');
    } else {
      setBookingModalOpen(true);
      setAlertMessage('');
    }
  };

  const handleBookingSuccess = () => {
    setAlertMessage(`Successfully booked ${selectedCourt} at ${selectedTimeSlot} on ${selectedDate}`);
    setSelectedCenter('');
    setSelectedCourt('');
    setSelectedSport('');
    setSelectedDate('');
    setSelectedTimeSlot('');
  };

  const handleBookingFailure = () => {
    setAlertMessage('Booking failed, please try again');
  };

  return (
    <div className="schedule-booking">
      <h2>Schedule a Booking</h2>
      {alertMessage && <div className="alert">{alertMessage}</div>}

      <div className="booking-form">
        <div>
        <label>Select Center:</label>
        <select onChange={(e) => setSelectedCenter(e.target.value)} value={selectedCenter}>
          <option value="">-- Select a Center --</option>
          {centers.map((center) => (
            <option key={center.name} value={center.name}>
              {center.name}
            </option>
          ))}
        </select>

        <label>Select Sport:</label>
        <select onChange={(e) => setSelectedSport(e.target.value)} value={selectedSport}>
          <option value="">-- Select a Sport --</option>
          {sports.map((sport) => (
            <option key={sport.name} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
        </div>

        <br />
        <br />
        <div>
        <label>Select Court:</label>
        <select onChange={(e) => setSelectedCourt(e.target.value)} value={selectedCourt}>
          <option value="">-- Select a Court --</option>
          {courts.map((court) => (
            <option key={court.courtId} value={court.courtName}>
              {court.courtName}
            </option>
          ))}
        </select>
        <label>Select Date:</label>
        <input type="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />

        </div>
        <br />
        <br />
        <label>Select Time Slot:</label>
        <select onChange={(e) => setSelectedTimeSlot(e.target.value)} value={selectedTimeSlot}>
          <option value="">-- Select a Time Slot --</option>
          {availableTimeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <br />
        <br />
        <button onClick={handleScheduleClick}>Schedule Booking</button>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBook={handleBookingSuccess}
        onFailure={handleBookingFailure}
      />
      
    </div>
  );
};

export default ScheduleBooking;
