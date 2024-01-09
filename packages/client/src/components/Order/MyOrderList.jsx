import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import StatusPayment from './StatusNavigation';
import OrderCart from './OrderCart';

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [filterOrders, setFilterOrders] = useState(0);
  const [status, setStatus] = useState('WAITING_FOR_PAYMENT');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/order?sortBy=${sortBy}&page=${currentPage}&booking_status=${status}`,
        );
        const { data, totalPages } = response.data;
        setOrders(data);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    setLoading(true);
    // delayedFetchOrders();
    fetchOrders();
  }, [sortBy, currentPage, status]);

  const updateFetching = async () => {
    try {
      const response = await api.get(
        `/order?sortBy=${sortBy}&page=${currentPage}`,
      );
      const data = await response.data;
      setOrders(data.data);
    } catch (error) {
      console.error('Failed to update profile picture', error);
    }
  };

  function handleSortChange(selectedSortBy) {
    switch (selectedSortBy) {
      case 'reverseAlphabet':
        setSortBy('reverseAlphabet');
        break;
      case 'lowestPrice':
        setSortBy('lowestPrice');
        break;
      case 'highestPrice':
        setSortBy('highestPrice');
        break;
      case 'alphabet':
        setSortBy('alphabet');
        break;
      default:
        break;
    }
  }

  const handleOrderUpdate = (updatedOrders) => {
    setOrders(updatedOrders);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFilterOrders = (value) => {
    setFilterOrders(length);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col max-w-7xl mx-auto gap-8 w-full mt-6">
        <div className="flex justify-between">
          <h1 className="text-2xl md:text-4xl font-bold capitalize px-4 md:px-0">
            My Booking List
          </h1>
          {/* Sort */}
          <div style={{ position: 'relative' }}>
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => setIsOpenSort(!isOpenSort)}
            >
              Sort By{' '}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              className={`absolute rounded-xl shadow-md bg-color-primary ${
                isOpenSort ? 'block' : 'hidden'
              } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              style={{
                position: 'absolute',
                top: 'calc(100% + 5px)',
                left: 0,
                zIndex: 999, // Atur z-index sesuai kebutuhan
              }}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                    onClick={() => handleSortChange('alphabet')}
                  >
                    A-Z
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                    onClick={() => handleSortChange('reverseAlphabet')}
                  >
                    Z-A
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                    onClick={() => handleSortChange('lowestPrice')}
                  >
                    Lowest Price
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                    onClick={() => handleSortChange('highestPrice')}
                  >
                    Highest Price
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <StatusPayment setStatus={setStatus} />
        <OrderCart
          orders={orders}
          setOrders={handleOrderUpdate}
          status={status}
          setFilterOrders={setFilterOrders}
          loading={loading}
          updateFetching={updateFetching}
        />
        {/* PAGINATION */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <div className="flex flex-row align-middle">
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
            <button
              type="button"
              className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg
                  className="w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderComponent;
