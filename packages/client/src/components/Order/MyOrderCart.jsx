import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import { HouseLine } from '@phosphor-icons/react';
import ModalPayment from './ModalPayment';
import ReviewModal from './ReviewModal';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
const OrderCart = ({ status }) => {
  const [order, setOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalReview, setModalReview] = useState(false);
  const [selectedSingleOrder, setSelectedSingleOrder] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await api.get('/order');
        const data = await response.data.data;
        console.log(data);

        if (status === 'all') {
          setOrder(data);
        } else {
          const filteredOrders = data.filter(
            (order) => order.booking_status === status,
          );

          setOrder(filteredOrders); // Pindahkan setOrder ke sini jika perlu
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch order list', error.message);
        setLoading(false);
      }
    };

    fetchOrderList();
  }, [status]);

  const handlePayNowClick = (singleOrder) => {
    setShowModal(true);
    setSelectedSingleOrder(singleOrder);
  };

  const handleReview = (singleOrder) => {
    setModalReview(true);
    setSelectedSingleOrder(singleOrder);
  };

  const handlePaymentProcessed = (name, orderId, total) => {
    const updatedOrder = order.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          payment_proof: name,
          booking_status: 'DONE',
          payment_status: 'ACCEPTED',
          total_price: total,
        };
      }
      return order;
    });
    setOrder(updatedOrder);
    router.push('/order');
  };

  return (
    <div className="flex justify-start gap-6">
      {loading ? (
        <p>Loading...</p>
      ) : order.length === 0 ? (
        <div className="ml-5 relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
          <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
            <p className="text-xl md:text-3xl lg:text-5xl font-bold text-gray-500">
              You Dont Have Any Order
            </p>
            <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
              Go to Home for Order
            </p>
            <a
              href="#"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
              title="Return Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <button onClick={() => (window.location.href = '/')}>
                Return Home
              </button>
            </a>
          </div>
        </div>
      ) : (
        order.map((singleOrder) => (
          <div key={singleOrder.id}>
            <div className="ml-5 relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <div className="ml-2 mt-3 flex w-min-full items-center justify-between left-0 p-2 bg-gradient-to-br from-blue-900 to-transparent text-white font-medium text-xs rounded-bl-md rounded-tr-md">
                <p>No. Booking: {singleOrder.booking_code}</p>
              </div>
              <div className="relative mx-4  overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                <img
                  src="https://media-cdn.tripadvisor.com/media/photo-s/1c/d4/42/cd/hotel-entrance.jpg"
                  alt="ui/ux review check"
                  className="w-full"
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60">
                  <button
                    className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-dark="true"
                  >
                    <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-6 w-6"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {singleOrder.Room.Property.name},{' '}
                    {singleOrder.Room.Property.address}
                  </h5>
                  <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="-mt-0.5 h-5 w-5 text-yellow-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    4.8
                  </p>
                </div>
                <div className="flex items-center gap-8 my-2">
                  <div>
                    <p className="text-sm font-normal leading-relaxed text-blue-gray-900 antialiased">
                      Check-In : {singleOrder.check_in_date}
                    </p>
                    <p className="text-sm font-normal leading-relaxed text-blue-gray-900 antialiased">
                      Check-Out : {singleOrder.check_out_date}
                    </p>
                  </div>
                  <p className="text-sm font-normal leading-relaxed text-blue-gray-900 antialiased">
                    Status Pembayaran: <br />{' '}
                    <span className="text-color-red">
                      {singleOrder.booking_status}
                    </span>
                  </p>
                </div>

                <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                  {singleOrder.Room.Property.description}
                </p>
                <div className="flex mt-2 text-md font-medium">
                  <p className="mr-2 text-gray-600">
                    Rp {singleOrder.total_invoice.toLocaleString('id-ID')}
                  </p>
                  <p className="mr-2  text-color-red line-through">
                    Rp {'500.000'.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-3">
                {singleOrder.booking_status === 'DONE' ? (
                  <button
                    className="block w-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                    onClick={() => handleReview(singleOrder.id)}
                  >
                    Leave a Review
                  </button>
                ) : singleOrder.booking_status === 'WAITING_FOR_PAYMENT' ? (
                  <button
                    className="block w-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                    onClick={() => handlePayNowClick(singleOrder)}
                  >
                    Pay Now
                  </button>
                ) : singleOrder.booking_status === 'PROCESSING_PAYMENT' ? (
                  <button
                    className="block w-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                  >
                    Waiting Confirm
                  </button>
                ) : (
                  <button
                    className="block w-full select-none rounded-lg text-color-primary bg-color-red py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                  >
                    Canceled
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      {showModal && (
        // OrderCart.jsx
        <ModalPayment
          closeModal={() => setShowModal(false)}
          onPaymentProcessed={handlePaymentProcessed}
          singleOrder={selectedSingleOrder} // Pastikan properti singleOrder diteruskan ke ModalPayment
        />
      )}
      {modalReview && (
        // Panggil komponen ReviewModal saat modalReview bernilai true
        <ReviewModal
          closeModal={() => setModalReview(false)}
          showModal={modalReview}
          orderId={selectedSingleOrder}
        />
      )}
    </div>
  );
};

export default OrderCart;
