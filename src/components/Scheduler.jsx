import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Scheduler.css';

const Scheduler = ({ center, sport }) => {
  const events = [
    // Example bookings data
    { title: 'Court 1', start: '2024-10-16T10:00:00', end: '2024-10-16T11:00:00' },
    { title: 'Court 2', start: '2024-10-16T11:00:00', end: '2024-10-16T12:00:00' },
  ];

  const handleDateClick = (info) => {
    // Open a modal for new booking (modal implementation later)
    alert(`Booking a court on: ${info.dateStr}`);
  };

  return (
    <div className="scheduler">
      <h2>
        Schedule for {sport} at {center}
      </h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        dateClick={handleDateClick}
        slotDuration="00:30:00"
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        editable={false}
        selectable={true}
      />
    </div>
  );
};

export default Scheduler;
