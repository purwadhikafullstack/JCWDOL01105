import { useCallback, useEffect, useState } from 'react';
import api from '../../../../config/api';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import Image from 'next/image';

const SalesReport = () => {
  const [propertyName, setPropertyName] = useState('');
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('ACCEPTED');
  const [reportSales, setReportSales] = useState([]);
  const [userValue, setUserValue] = useState([]);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [total_Income, setTotal_Income] = useState(0);

  const fetchUserDate = useCallback(async () => {
    try {
      const formatedDate = selectedDate
        ? moment(selectedDate).format('YYYY-MM-DD')
        : '';
      const response = await api.get(
        `sales-report?propertyId=${propertyName}&user=${user}&status=${status}&page=${page}&limit=${limit}&check_in=${formatedDate}`,
      );
      const reportSalesData = response.data;
      setTotal_Income(reportSalesData.totalInvoiceAccepted || 0);
      setReportSales(reportSalesData.orders || []);
      setIsEmpty(reportSalesData.orders.length === 0);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [propertyName, user, status, selectedDate, page, limit]);

  const property = async () => {
    try {
      const response = await api.get('sales-report/property');
      const propertyData = response.data;
      setProperties(propertyData.properties || []);
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  };

  const users = async () => {
    try {
      const response = await api.get('sales-report/user');
      const userData = response.data;
      setUserValue(userData.userName || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserDate();
    property();
    users();
  }, [propertyName, user, status, selectedDate, page, limit, fetchUserDate]);

  const handlePropertyChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
    fetchUserDate();
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchUserDate();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 w-screen-full">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Sales Report</h2>
        </div>
        <div className="my-2 flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center mb-1 sm:mb-0 gap-2">
            <div className="relative inline-block w-full sm:w-auto">
              <div className="flex items-center gap-4">
                <h1 className="text-lg">Property:</h1>
                <select
                  value={propertyName}
                  onChange={handlePropertyChange}
                  className="appearance-none h-full rounded-md border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                >
                  <option value={''}>All Property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Transaction:</h1>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="appearance-none h-full rounded-md border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 relative sm:max-w-xs right-0 top-0"
                >
                  <option value={''}>Payment_Status</option>
                  <option>ACCEPTED</option>
                  <option>DECLINED</option>
                </select>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center gap-2">
                <h1 className="text-lg">User</h1>
                <select
                  value={user}
                  onChange={handleUserChange}
                  className="appearance-none h-full rounded-md border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 relative sm:max-w-xs right-0 top-0"
                >
                  <option value={''}>User Name</option>
                  {userValue.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative flex max-2-sm self-end sm:self-auto">
            <div className="relative">
              <div className="flex ml-2 border rounded-md p-2">
                <div className="w-5 h-5 mx-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    color="#999"
                  >
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  datepicker=""
                  datepicker-format="mm-dd-yyyy"
                  type="text"
                  placeholderText="mm-dd-yyyy"
                  className="appearance-none h-full rounded-md border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 sm:max-w-xs relative"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {isEmpty ? (
            <div className="flex items-center mt-6 text-center border rounded-lg h-96 dark:border-gray-700">
              <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
                <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <h1 className="mt-3 text-4xl text-gray-800 dark:text-white">
                  No results found, Change your filter
                </h1>
              </div>
            </div>
          ) : (
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal overflow-x-auto sm:overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Property Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transaction_Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Check_In Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportSales.map((order, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <Image
                              className="w-full h-full rounded-full"
                              src={order.User.User_Profile.profile_picture}
                              alt={order.User.name}
                              width={200}
                              height={200}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.User.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              Property Id: {order.rooms.property.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.rooms.property.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <span>
                            {moment(order.payment_date, 'YYYY-MM-DD').format(
                              'DD-MM-YYYY',
                            )}
                          </span>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <span>
                            {moment(order.check_in_date, 'YYYY-MM-DD').format(
                              'DD-MM-YYYY',
                            )}
                          </span>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.total_invoice.toLocaleString('id-ID')}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-gray-200 bg-white text-sm">
                        <p
                          className={`${
                            order.payment_status === 'ACCEPTED'
                              ? 'text-color-pallete3'
                              : order.payment_status === 'DECLINED'
                              ? 'text-color-red'
                              : ''
                          }`}
                        >
                          {order.payment_status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={handlePrevPage}
                  >
                    Previous
                  </button>
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700 ml-3"
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-end xs:justify-between">
            <div className="flex items-center">
              <span className="text-gray-700 font-semibold mr-2">
                Total Income:
              </span>
              <span className="text-gray-900 font-bold text-xl">
                Rp.{total_Income.toLocaleString('id-ID')}
              </span>
              <AiOutlineDollarCircle className="ml-2 w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
