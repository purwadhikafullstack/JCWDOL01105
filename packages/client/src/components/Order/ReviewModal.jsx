import React, { useEffect, useState } from 'react';
import api from '../../config/api';

const ReviewModal = ({
  closeModal,
  showModal,
  orderId,
  showToast,
  updateFetching,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const review = await api.post('/review/create-review', {
        order_id: orderId.toString(),
        rating: rating.toString(),
        comment: comment,
      });
      if (review.status === 200) {
        showToast('Review Submitted', 'success');
        updateFetching();
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-auto min-h-screen py-6 flex flex-col justify-center sm:py-12 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <div className="bg-color-primary min-w-1xl flex flex-col rounded-xl shadow-lg">
            <div className="px-12 py-5">
              <h2 className="text-gray-800 text-3xl font-semibold">
                Give a Review to Your Order
              </h2>
            </div>
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-6 space-y-3">
                <div className="flex space-x-3">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-12 h-12 ${
                        index < rating ? 'text-color-yellow' : 'text-gray-500'
                      } fill-current hover:text-color-yellow transition duration-300 ease-in-out`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={() => handleRatingClick(index)}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="w-3/4 flex flex-col" id="ratingContainer">
                <textarea
                  rows={3}
                  className="p-4 text-gray-500 rounded-xl resize-none"
                  placeholder="Write a review"
                  onChange={handleCommentChange}
                />
                <button
                  className="py-3 my-8 text-lg bg-gradient-to-r from-color-pallete2 to-indigo-600 rounded-xl text-white"
                  onClick={handleSubmit}
                >
                  Rate now
                </button>
              </div>
            </div>
            <div className="h-20 flex items-center justify-center mb-5">
              <button
                href="#"
                className="text-color-red"
                onClick={handleCloseModal}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
