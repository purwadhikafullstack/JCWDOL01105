import { useEffect, useState } from 'react';
import api from '../../../../config/api';

const TransactionOrderComponent = () => {
  const [orders, setOrders] = useState([]);

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
      updateOrderStatus(id, 'ACCEPTED');
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  const rejectPayment = async (id) => {
    try {
      await api.put(`/orders/reject-payment/${id}`);
      updateOrderStatus(id, 'DECLINED');
    } catch (error) {
      console.error('Error rejecting payment:', error);
    }
  };

  const cancelOrder = async (id) => {
    try {
      await api.put(`/orders/cancel-order/${id}`);
      updateOrderStatus(id, 'DECLINED', 'CANCELED');
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const updateOrderStatus = (id, paymentStatus) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order.id === id) {
          let bookingStatus;

          if (paymentStatus === 'ACCEPTED') {
            bookingStatus = 'DONE';
          } else if (paymentStatus === 'DECLINED') {
            bookingStatus = 'CANCELED';
          } else {
            bookingStatus = '-';
          }

          return {
            ...order,
            payment_status: paymentStatus,
            booking_status: bookingStatus,
          };
        }
        return order;
      });

      console.log('Updated Orders:', updatedOrders);
      return updatedOrders;
    });
  };

  return (
    <div className="bg-color-primary min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8">Users Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`bg-color-dark p-6 rounded-md shadow-md ${
              order.isCancelled
                ? 'bg-color-neutral'
                : 'border border-color-grey'
            } transition duration-300 hover:shadow-lg hover:border-color-pallete1`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {order.User
                  ? `${order.User.name}'s Order`
                  : `Order No. ${order.id}`}
              </h3>
              <span
                className={`text-sm font-semibold ${
                  order.isCancelled && 'text-color-lightred'
                }`}
              >
                {order.booking_status}
              </span>
            </div>
            <p className="mb-2">
              <strong>Room:</strong> {order.room_id}
            </p>
            <p className="mb-2">
              <strong>Check-in:</strong> {order.check_in_date}
            </p>
            <p className="mb-2">
              <strong>Check-out:</strong> {order.check_out_date}
            </p>
            <p className="mb-2">
              <strong>Guests:</strong> {order.guests}
            </p>
            <p className="mb-2">
              <strong>Total Price:</strong> {formatPrice(order.price)}
            </p>
            <p className="mb-2">
              <strong>Booking Code:</strong> {order.booking_code}
            </p>
            <p className="mb-2">
              <strong>Payment Status:</strong> {order.payment_status}
            </p>
            {!order.paymentConfirmed && order.booking_status !== 'CANCELED' && (
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => confirmPayment(order.id)}
                  className="btn-order btn-success bg-color-pallete1 rounded-md"
                >
                  Confirm Payment
                </button>
                <button
                  onClick={() => rejectPayment(order.id)}
                  className="btn-order btn-danger bg-color-red1 rounded-md"
                >
                  Reject Payment
                </button>
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={() => cancelOrder(order.id)}
                className="btn-order btn-outline-danger bg-color-secondary rounded-md"
                disabled={order.booking_status === 'CANCELED'}
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
