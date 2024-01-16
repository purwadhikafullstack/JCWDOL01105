import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReviewModal from './ReviewModal';
import ModalPayment from './ModalPayment';
import { toast } from 'react-toastify';
import ModalCancel from './ModalCancel';
import Image from 'next/image';

const OrderCart = ({
  orders,
  setOrders,
  status,
  setFilterOrders,
  loading,
  updateFetching,
}) => {
  const [showModalReview, setShowModalReview] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [selectedSingleOrder, setSelectedSingleOrder] = useState(null);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  const filterOrders =
    status === 'ALL'
      ? orders
      : orders.filter((order) => {
          return order.booking_status === status;
        });

  useEffect(() => {
    setFilterOrders(filterOrders.length);
  }, [filterOrders, setFilterOrders]);

  const handleModalReview = (singleOrder) => {
    setShowModalReview(true);
    setSelectedSingleOrder(singleOrder);
  };

  const handleModalPayment = (singleOrder) => {
    setShowModalPayment(true);
    setSelectedSingleOrder(singleOrder);
  };

  const handlePaymentProcessedAutomatic = (name, orderId, total) => {};

  const handleCancelOrder = (singleOrder) => {
    try {
      const updatedOrders = orders.filter(
        (order) => order.id !== singleOrder.id,
      );
      const updatedFilteredOrders = filterOrders.filter(
        (order) => order.id !== singleOrder.id,
      );

      setOrders(updatedOrders);
      setFilterOrders(updatedFilteredOrders);

      setSelectedSingleOrder(singleOrder);
      setShowModalCancel(true);
    } catch (error) {
      console.log('Error handling cancel order:', error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full md:flex-row mb-4">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterOrders.map((singleOrder) => (
              <div key={singleOrder.id}>
                <div className="ml-5 relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                  <div className="ml-2 mt-3 flex w-min-full items-center justify-between left-0 p-2 bg-gradient-to-br from-blue-900 to-transparent text-white font-medium text-xs rounded-bl-md rounded-tr-md">
                    <p>No. Booking: {singleOrder.booking_code}</p>
                  </div>
                  <div className="relative mx-4  overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <Image
                      src="https://media-cdn.tripadvisor.com/media/photo-s/1c/d4/42/cd/hotel-entrance.jpg"
                      alt="ui/ux review check"
                      className="w-full"
                      width={300}
                      height={300}
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
                        {singleOrder.rooms.properties.name}, <br />
                        {singleOrder.rooms.properties.address}
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
                    <div className="flex mt-2 text-md font-medium">
                      <p className="mr-2 text-gray-600">
                        Rp
                        {singleOrder.total_invoice.toLocaleString('id-ID')}
                      </p>
                      <p className="mr-2  text-color-red line-through">
                        Rp {'500.000'.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="flex items-center gap-8 my-2 justify-between">
                      <p className="text-sm font-normal leading-relaxed text-blue-gray-900 antialiased">
                        Check-In :
                        <span className="font-bold">
                          {moment(
                            singleOrder.check_in_date,
                            'YYYY-MM-DD',
                          ).format(' DD-MM-YYYY')}
                        </span>
                      </p>
                      <p className="text-sm font-normal leading-relaxed text-blue-gray-900 antialiased">
                        Check-Out :
                        <span className="font-bold">
                          {moment(
                            singleOrder.check_out_date,
                            'YYYY-MM-DD',
                          ).format(' DD-MM-YYYY')}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm font-normal leading-relaxed text-blue-gray-900 antialiased mb-5">
                      Payment Status: <br />
                      <span
                        className={
                          singleOrder.booking_status === 'WAITING_FOR_PAYMENT'
                            ? 'text-color-blue' // Warna teks untuk status 'WAITING_FOR_PAYMENT'
                            : singleOrder.booking_status ===
                              'PROCESSING_PAYMENT'
                            ? 'text-color-yellow' // Warna teks untuk status 'PROCESSING_PAYMENT'
                            : singleOrder.booking_status === 'DONE'
                            ? 'text-color-green' // Warna teks untuk status 'DONE'
                            : singleOrder.booking_status === 'CANCELED'
                            ? 'text-color-red' // Warna teks untuk status 'CANCELED'
                            : 'text-blue-gray-900' // Warna teks default jika status tidak cocok dengan kondisi di atas
                        }
                      >
                        {singleOrder.booking_status}
                      </span>
                    </p>
                    {singleOrder.booking_status === 'WAITING_FOR_PAYMENT' &&
                      (moment().isBefore(
                        moment(singleOrder.check_in_date, 'YYYY-MM-DD'),
                        'day',
                      ) ||
                        moment().isSame(
                          moment(singleOrder.check_in_date, 'YYYY-MM-DD'),
                        )) && (
                        <div className="flex gap-2">
                          <button
                            className="block w-full select-none rounded-lg bg-color-blue py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                            onClick={() => handleModalPayment(singleOrder)} // Fungsi untuk menangani pembayaran
                          >
                            Pay Now
                          </button>
                          <button
                            className="block w-full select-none rounded-lg bg-color-red py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                            onClick={() => handleCancelOrder(singleOrder.id)} // Fungsi untuk membatalkan pesanan
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    {singleOrder.booking_status === 'PROCESSING_PAYMENT' && (
                      <button
                        className="block w-full select-none rounded-lg bg-color-primary py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        disabled
                      >
                        Waiting Confirmation
                      </button>
                    )}
                    {singleOrder.booking_status === 'DONE' &&
                      ((moment().isAfter(
                        moment(singleOrder.check_out_date, 'YYYY-MM-DD'),
                        'day',
                      ) ||
                        moment().isSame(
                          moment(singleOrder.check_out_date, 'YYYY-MM-DD'),
                        )) &&
                      singleOrder.Reviews.length === 0 ? (
                        <button
                          className="block w-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          data-ripple-light="true"
                          onClick={() => handleModalReview(singleOrder.id)}
                        >
                          Leave a Review
                        </button>
                      ) : (
                        <button
                          className="block w-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          data-ripple-light="true"
                          disabled
                        >
                          DONE
                        </button>
                      ))}
                    {singleOrder.booking_status === 'CANCELED' && (
                      <button
                        className="block w-full select-none rounded-lg bg-color-red py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        disabled
                      >
                        CANCELLED
                      </button>
                    )}
                    {singleOrder.booking_status === 'DONE' &&
                      moment(singleOrder.check_in_date).isBefore(moment()) &&
                      moment(singleOrder.check_out_date).isAfter(moment()) && (
                        <button
                          className="block w-full select-none rounded-lg bg-color-green py-3.5 px-5 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          data-ripple-light="true"
                          onClick={() => handleCheckOut(singleOrder)}
                        >
                          <span className="text-color-primary text-xs">
                            Check Out: {singleOrder.check_out_date} 01:00 PM
                          </span>
                        </button>
                      )}
                    {singleOrder.booking_status === 'DONE' &&
                      moment(singleOrder.check_in_date).isAfter(moment()) && (
                        <button
                          className="block w-full select-none rounded-lg bg-color-green py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          data-ripple-light="true"
                          onClick={() => handleCheckIn(singleOrder)}
                        >
                          <span className="text-color-primary text-xs">
                            Check In: {singleOrder.check_in_date} 03:00 PM
                          </span>
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModalReview && (
        <ReviewModal
          closeModal={() => setShowModalReview(false)}
          orderId={selectedSingleOrder}
          showModal={showModalReview}
          showToast={showToast}
          updateFetching={updateFetching}
        />
      )}
      {showModalPayment && (
        <ModalPayment
          closeModal={() => setShowModalPayment(false)}
          onPaymentProcessed={handlePaymentProcessedAutomatic}
          singleOrder={selectedSingleOrder}
          showModalPayment={showModalPayment}
          showToast={showToast}
          updateFetching={updateFetching}
        />
      )}
      {showModalCancel && (
        <ModalCancel
          closeModal={() => setShowModalCancel(false)}
          singleOrder={selectedSingleOrder}
          showToast={showToast}
          updateFetching={updateFetching}
        />
      )}
    </div>
  );
};

export default OrderCart;
