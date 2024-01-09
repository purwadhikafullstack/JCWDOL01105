import React from 'react';
import { useState } from 'react';

const StatusPayment = ({ setStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setStatus(newStatus);
  };
  return (
    <div>
      <div>
        <ol className="flex flex-col sm:flex-row sm:items-center mb-1 sm:mb-0 gap-2">
          <h2 className="ml-5 block w-min-full select-none rounded-lg text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none">
            Status :{' '}
          </h2>

          <button
            className={`block w-min-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
              selectedStatus === 'WAITING_FOR_PAYMENT'
                ? 'bg-opacity-100'
                : 'bg-opacity-50'
            }`}
            type="button"
            data-ripple-light="true"
            onClick={() => handleStatusChange('WAITING_FOR_PAYMENT')}
          >
            Waiting Payment
          </button>
          <button
            className={`block w-min-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
              selectedStatus === 'PROCESSING_PAYMENT'
                ? 'bg-opacity-100'
                : 'bg-opacity-50'
            }`}
            type="button"
            data-ripple-light="true"
            onClick={() => handleStatusChange('PROCESSING_PAYMENT')}
          >
            Waiting Confirmation
          </button>
          <button
            className={`block w-min-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none${
              selectedStatus === 'waiting_payment'
                ? 'bg-opacity-100'
                : 'bg-opacity-50'
            }`}
            type="button"
            data-ripple-light="true"
            onClick={() => handleStatusChange('DONE')}
          >
            Success
          </button>
          <button
            className={`block w-min-full select-none rounded-lg bg-color-pallete3 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
              selectedStatus === 'waiting_payment'
                ? 'bg-opacity-100'
                : 'bg-opacity-50'
            }`}
            type="button"
            data-ripple-light="true"
            onClick={() => handleStatusChange('CANCELED')}
          >
            Canceled
          </button>
        </ol>
      </div>
    </div>
  );
};

export default StatusPayment;
