import React from 'react';

const SalesReport = () => {
  const salesData = [
    { id: 1, date: '2023-12-01', totalSales: '$500', itemsSold: 20 },
    { id: 2, date: '2023-12-02', totalSales: '$700', itemsSold: 25 },
    { id: 3, date: '2023-12-03', totalSales: '$900', itemsSold: 30 },
    // Tambahkan data penjualan lain jika perlu
  ];

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
