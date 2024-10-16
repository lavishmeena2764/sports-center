import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './AllBookings.css';

const AllBookings = () => {
  const [centers, setCenters] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');

  // Fetch data from JSON files
  useEffect(() => {
    fetch('/centers.json')
      .then(response => response.json())
      .then(data => setCenters(data.centers));

    fetch('/bookings.json')
      .then(response => response.json())
      .then(data => setBookings(data.bookings));
  }, []);

  // Filter bookings based on selected filters
  useEffect(() => {
    const filtered = bookings.filter(booking => {
      return (
        (!selectedCenter || booking.center === selectedCenter) &&
        (!selectedSport || booking.sport === selectedSport) &&
        (!selectedCourt || booking.court === selectedCourt)
      );
    });
    setFilteredBookings(filtered);
  }, [selectedCenter, selectedSport, selectedCourt, bookings]);

  // Convert filtered bookings to calendar events
  const events = filteredBookings.map(booking => ({
    title: `${booking.sport} - ${booking.court}`,
    start: `${booking.date}T${booking.timeSlot.split('-')[0]}:00`,
    end: `${booking.date}T${booking.timeSlot.split('-')[1]}:00`
  }));

  return (
    <div className="all-bookings">
      <h2 className='mb-4'>All Bookings</h2>

      {/* Filter Controls */}
      <div className="filters" style={{display:"flex", flexDirection:'row', justifyContent:"center"}}>
        <label>
          Select Center:
          <select value={selectedCenter} onChange={(e) => setSelectedCenter(e.target.value)}>
            <option value="">-- All Centers --</option>
            {centers.map(center => (
              <option key={center.name} value={center.name}>
                {center.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Sport:
          <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
            <option value="">-- All Sports --</option>
            {centers
              .filter(center => center.name === selectedCenter)[0]?.sports.map(sport => (
                <option key={sport.name} value={sport.name}>
                  {sport.name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Select Court:
          <select value={selectedCourt} onChange={(e) => setSelectedCourt(e.target.value)}>
            <option value="">-- All Courts --</option>
            {centers
              .filter(center => center.name === selectedCenter)[0]?.sports
              .filter(sport => sport.name === selectedSport)[0]?.courts.map(court => (
                <option key={court.courtId} value={court.courtName}>
                  {court.courtName}
                </option>
              ))}
          </select>
        </label>
      </div>

      {/* FullCalendar Component */}
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        events={events}
        slotDuration="00:30:00"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        editable={false}
      />
    </div>
  );
};

export default AllBookings;
