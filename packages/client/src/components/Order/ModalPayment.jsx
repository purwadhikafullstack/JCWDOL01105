import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiCashLine, RiBankCardLine } from 'react-icons/ri';
import ManualPayment from './PaymentMethod/ManualPayment';
import TriggerPayment from './PaymentMethod/Midtrans';
import PaymentProcessor from './PaymentMethod/MidtransPayment';

const ModalPayment = ({
  closeModal,
  showModalPayment,
  onPaymentProcessed,
  singleOrder,
  showToast,
  updateFetching,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handlePayNowClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setIsOpen(showModalPayment);
  }, [showModalPayment]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-auto min-h-screen py-6 flex items-center flex-col justify-center transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        <div className="bg-color-primary shadow-md mb-20 px-8 py-6 rounded-xl space-y-4 max-w-md bg-opacity-90 backdrop-blur-md">
          <div>
            <form method="dialog">
              <button
                className="btn btn-sm btn-square btn-ghost absolute right-2 top-2"
                onClick={handleCloseModal}
              >
                <RiCloseLine className="text-2xl" />
              </button>
            </form>
            <h3 className="font-bold text-lg text-center mb-6">
              Metode Pembayaran
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <PaymentProcessor
                singleOrder={singleOrder}
                onPaymentProcessed={onPaymentProcessed}
                showToast={showToast}
              />
              <button
                className="btn btn-square rounded-lg radiu btn-ghost normal-case aspect-square w-full h-full shadow-sm hover:shadow-md bg-color-pallete3"
                style={{ padding: '72px', fontSize: '72px' }}
                onClick={handlePayNowClick}
              >
                <div className="flex flex-col gap-2 justify-center items-center">
                  <RiBankCardLine className="text-3xl sm:text-4xl" />
                  <p className="text-md sm:text-lg font-medium">Manual</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        {showModal && (
          <ManualPayment
            closeModal={() => setShowModal(false)}
            singleOrder={singleOrder}
            showToast={showToast}
            handleCloseModal={handleCloseModal}
            updateFetching={updateFetching}
          />
        )}
      </div>
    </>
  );
};

export default ModalPayment;
