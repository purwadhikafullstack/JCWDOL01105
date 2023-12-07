import React, { useState } from 'react';

const TransactionOrderComponent = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      userName: 'User 1',
      room: 'Standard Room',
      checkIn: '2023-12-01',
      checkOut: '2023-12-05',
      totalPrice: '$500',
      paymentConfirmed: false,
      paymentStatus: 'Pending',
      houseRulesReminderSent: false,
      isCancelled: false,
    },
    {
      id: 2,
      userName: 'User 2',
      room: 'Deluxe Suite',
      checkIn: '2023-12-10',
      checkOut: '2023-12-15',
      totalPrice: '$800',
      paymentConfirmed: true,
      paymentStatus: 'Confirmed',
      houseRulesReminderSent: true,
      isCancelled: false,
    },
    // Add more sample orders here
  ]);

  const confirmPayment = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, paymentConfirmed: true, paymentStatus: 'Confirmed' }
        : order,
    );
    setOrders(updatedOrders);
  };

  const rejectPayment = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, paymentConfirmed: false, paymentStatus: 'Rejected' }
        : order,
    );
    setOrders(updatedOrders);
  };

  const sendHouseRulesReminder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, houseRulesReminderSent: true } : order,
    );
    setOrders(updatedOrders);
  };

  const cancelOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, isCancelled: true } : order,
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">User Orders</h2>
      <div>
        <ul>
          {orders.map((order) => (
            <li
              key={order.id}
              className={`mb-4 p-4 border ${
                order.isCancelled ? 'bg-gray-200' : 'border-gray-300'
              } rounded-md`}
            >
              <h3 className="text-lg font-semibold mb-2">
                {order.userName}'s Order
              </h3>
              <p>Room: {order.room}</p>
              <p>Check-in: {order.checkIn}</p>
              <p>Check-out: {order.checkOut}</p>
              <p>Total Price: {order.totalPrice}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              {!order.paymentConfirmed && (
                <div>
                  <button
                    onClick={() => confirmPayment(order.id)}
                    className="mt-2 bg-green-500 text-white py-1 px-2 rounded-md mr-2"
                  >
                    Confirm Payment
                  </button>
                  <button
                    onClick={() => rejectPayment(order.id)}
                    className="mt-2 bg-red-500 text-white py-1 px-2 rounded-md"
                  >
                    Reject Payment
                  </button>
                </div>
              )}
              {!order.houseRulesReminderSent && order.paymentConfirmed && (
                <button
                  onClick={() => sendHouseRulesReminder(order.id)}
                  className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
                >
                  Send House Rules Reminder
                </button>
              )}
              {!order.isCancelled && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="mt-2 bg-red-500 text-white py-1 px-2 rounded-md"
                >
                  Cancel Order
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionOrderComponent;
