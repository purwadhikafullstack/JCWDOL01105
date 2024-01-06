import React, { useState } from 'react';
import api from '../../../config/api';

const ManualPayment = ({
  closeModal,
  singleOrder,
  showToast,
  handleCloseModal,
  updateFetching,
}) => {
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState(null);

  const { id, total_invoice } = singleOrder || {};

  const handlePaymentProofSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('payment_proof', file);
      formData.append('order_id', id);
      formData.append('amout', total_invoice);

      try {
        const response = await api.post('/order/payment_proof', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('Payment proof submitted successfully.');
          showToast('Payment proof submitted successfully.', 'success');
          updateFetching();
          handleCloseModal();
          closeModal();
        } else {
          console.error('Failed to submit payment proof.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handlePaymentProofChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <div>
      <div className="fixed inset-0 z-auto overflow-auto flex items-center justify-center p-12">
        {/* <div className="mx-auto w-full max-w-[550px] bg-color-primary  shadow-color-pallete1"> */}
        <div className="bg-color-primary shadow-color-pallete1 mb-20 px-8 py-6 rounded-xl space-y-4 bg-opacity-90 backdrop-blur-md mx-auto w-full max-w-[550px]">
          <form
            className="py-6 px-9"
            action="https://formbold.com/s/FORM_ID"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              handlePaymentProofSubmit();
            }}
          >
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload Payment Proof
              </label>
              <div className="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                  onChange={handlePaymentProofChange}
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center border border-dashed border-color-primary p-12 text-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-blue hover:text-white"
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-w-full h-auto"
                    />
                  ) : (
                    <div className="w-64 flex flex-col items-center">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span className="mt-2 text-base leading-normal">
                        Select a file
                      </span>
                      <input type="file" className="hidden" />
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-color-pallete3 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Send File
              </button>
              <button
                className="mt-5 before:hover:shadow-form w-full rounded-md text-color-primary bg-color-red py-3 px-8 text-center text-base font-semibold text-white outline-none
              "
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManualPayment;
