import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

const HomeDashboard = () => {
  // Dummy data for properties and rooms
  const properties = [
    { id: 1, title: 'Property A' },
    { id: 2, title: 'Property B' },
    // Add more properties if needed
  ];

  const rooms = [
    {
      id: 1,
      title: 'Room 101',
      start: '2023-12-01',
      end: '2023-12-05',
      propertyId: 1,
    },
    {
      id: 2,
      title: 'Room 202',
      start: '2023-12-10',
      end: '2023-12-15',
      propertyId: 2,
    },
    // Add more rooms if needed
  ];

  // Function to handle calendar date selection
  const handleDateSelect = (arg) => {
    console.log('Selected dates:', arg.start, arg.end);
    // Perform any action upon date selection if needed
  };

  return (
    <div>
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={rooms}
          select={handleDateSelect}
        />
      </div>
    </div>
  );
};

export default HomeDashboard;
