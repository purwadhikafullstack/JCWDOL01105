import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../../../../config/api';

const HomeDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await api.get('/orders/transactions', {
          params: { payment_status: 'ACCEPTED' },
        });
        const transactionsData = transactionsResponse.data.data;

        console.log('Transactions Data:', transactionsData);

        if (transactionsData && transactionsData.length > 0) {
          const groupedEvents = groupTransactionsByDate(transactionsData);

          const processedEvents = Object.values(groupedEvents).map((group) => ({
            id: `${group[0].room_id}-${group[0].id}`,
            title: `Booked (${group.length} reservations)`,
            start: group[0].check_in_date,
            end: group[0].check_out_date,
            backgroundColor: 'grey',
            borderColor: 'grey',
            editable: false,
          }));
          setEvents(processedEvents);
        } else {
          console.log('No transactions data available.');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((grouped, transaction) => {
      const key = `${transaction.check_in_date}-${transaction.check_out_date}`;

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(transaction);
      return grouped;
    }, {});
  };

  return (
    <div>
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={events}
        />
      </div>
    </div>
  );
};

export default HomeDashboard;
