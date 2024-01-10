import React, { useState } from 'react';
import api from '../../config/api';

const OrderCancel = ({
  closeModal,
  singleOrder,
  showToast,
  updateFetching,
}) => {
  const [cancelReason, setCancelReason] = useState('');
  const [reasonSelected, setReasonSelected] = useState('');

  const order_id = singleOrder;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalReason =
        reasonSelected === 'other' ? cancelReason : reasonSelected;

      const response = await api.post(`/order/cancel_order/${order_id}`, {
        cancel_reason: finalReason,
      });
      showToast('Order Cancelled', 'success');
      updateFetching();
      closeModal();
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleReasonChange = (e) => {
    setReasonSelected(e.target.value);
    // Reset cancelReason if the selected reason changes
    setCancelReason('');
  };

  return (
    <>
      <div className="fixed inset-0 z-auto flex mx-auto items-center justify-center max-w-lg">
        <form className="w-full max-w-xl bg-color-primary rounded-lg px-4 pt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              Cancel Your Order
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <select
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                onChange={handleReasonChange}
                value={reasonSelected}
              >
                <option value="">Select a reason</option>
                <option value="reason1">I Want to Change My Room</option>
                <option value="reason2">I Want to Reschedule My Room</option>
                <option value="other">Other</option>
              </select>
              {reasonSelected === 'other' && (
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white mt-2"
                  name="body"
                  placeholder="Type Your Reason"
                  required=""
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              )}
            </div>
            <div className="w-full md:w-full flex items-start  px-3">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
            </div>
            <div className="flex items-center justify-end w-full gap-4 mr-4">
              <button
                className="bg-color-red hover:bg-color-red text-color-primary font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                className="bg-color-blue hover:bg-color-blue text-color-primary font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderCancel;
