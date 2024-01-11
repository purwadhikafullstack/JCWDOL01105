import React, { useEffect, useState } from 'react';
import api from '../../../../config/api';

const TransactionOrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/transactions');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching Orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const confirmPayment = async (id) => {
    try {
      await api.put(`/orders/confirm-payment/${id}`);

      const updatedOrders = orders.map((order) =>
        order.id === id
          ? { ...order, payment_status: 'ACCEPTED', booking_status: 'DONE' }
          : order,
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  const rejectPayment = async (id) => {
    try {
      await api.put(`/orders/reject-payment/${id}`);

      const updatedOrders = orders.map((order) =>
        order.id === id
          ? { ...order, payment_status: 'DECLINED', booking_status: 'CANCELED' }
          : order,
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error rejecting payment:', error);
    }
  };

  const cancelOrder = async (id) => {
    try {
      await api.put(`/orders/cancel-order/${id}`);

      const updatedOrders = orders.map((order) =>
        order.id === id
          ? {
              ...order,
              booking_status: 'CANCELED',
              payment_status: 'DECLINED',
            }
          : order,
      );

      setOrders(updatedOrders);
      setCanceledOrders((prevCanceledOrders) => [...prevCanceledOrders, id]);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div className="bg-color-primary rounded-lg shadow-md p-6 ">
      <h2 className="text-2xl font-bold mb-4">Users Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-6 border shadow-lg ${
              order.isCancelled ? 'bg-color-lightGrey' : 'border-dark'
            } rounded-md transition duration-300 hover:shadow-lg hover:border-pallete1`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{order.name}'s Order</h3>
              <span
                className={`text-sm font-semibold ${
                  order.isCancelled && 'text-color-lightred'
                }`}
              >
                {order.booking_status}
              </span>
            </div>
            <p className="mb-2">Room: {order.room_id}</p>
            <p className="mb-2">Check-in: {order.check_in_date}</p>
            <p className="mb-2">Check-out: {order.check_out_date}</p>
            <p className="mb-2">Guests: {order.guests}</p>
            <p className="mb-2">Total Price: {formatPrice(order.price)}</p>
            <p className="mb-2">Booking Code: {order.booking_code}</p>
            <p className="mb-2">Payment Status: {order.payment_status}</p>
            {!order.paymentConfirmed && !canceledOrders.includes(order.id) && (
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => confirmPayment(order.id)}
                  className="btn btn-success bg-color-pallete3 rounded"
                  disabled={order.booking_status === 'DONE'}
                >
                  Confirm Payment
                </button>
                <button
                  onClick={() => rejectPayment(order.id)}
                  className="btn btn-danger bg-color-lightred rounded"
                  disabled={order.booking_status === 'DONE'}
                >
                  Reject Payment
                </button>
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={() => cancelOrder(order.id)}
                className="btn btn-outline-danger bg-color-grey rounded"
              >
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionOrderComponent;
