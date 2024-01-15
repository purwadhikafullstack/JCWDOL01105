import React, { useEffect, useState } from 'react';
import api from '../../../../config/api';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineDollarCircle } from 'react-icons/ai';

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

  const fetchUserDate = async () => {
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
  };

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
  }, [propertyName, user, status, selectedDate, page, limit]);

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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Sales Report</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Total Sales</th>
            <th className="border border-gray-300 px-4 py-2">Items Sold</th>
            {/* Tambahkan kolom lain jika perlu */}
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td className="border border-gray-300 px-4 py-2">{sale.date}</td>
              <td className="border border-gray-300 px-4 py-2">
                {sale.totalSales}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {sale.itemsSold}
              </td>
              {/* Tambahkan kolom lain jika perlu */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
