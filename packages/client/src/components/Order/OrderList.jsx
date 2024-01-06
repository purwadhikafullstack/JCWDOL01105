import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [name, setName] = useState('');
  const [order_id, setOrderId] = useState('');
  const [total, setTotal] = useState(0);

  const [token, setToken] = useState('');

  const processPayment = async (e) => {
    e.preventDefault(); // Untuk mencegah form dari pengiriman default

    const data = {
      name: name,
      order_id: order_id,
      total: total,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/order/payment',
        data,
        config,
      );

      if (response.status === 200) {
        console.log(response.data.data);
      }

      setToken(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem('Pembayaran', JSON.stringify(result));
          setToken('');
        },
        onPending: (result) => {
          localStorage.setItem('Pembayaran', JSON.stringify(result));
          setToken('');
        },
        onError: (error) => {
          console.error('Error:', result);
          setToken('');
        },
        onClose: () => {
          console.log(
            'Customer closed the popup without finishing the payment',
          );
          setToken('');
        },
      });

      setName('');
      setOrderId('');
      setTotal(0);
    }
  }, [token]);

  useEffect(() => {
    const midTransUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let script = document.createElement('script');

    script.src = midTransUrl;

    const midtransClientKey = 'SB-Mid-client-bsq4HCtJLBxOlL0K';
    script.setAttribute('data-client-key', midtransClientKey);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <form onSubmit={processPayment}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="order_id" className="block text-gray-700">
            Order ID:
          </label>
          <input
            type="text"
            id="order_id"
            value={order_id}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="total" className="block text-gray-700">
            Total:
          </label>
          <input
            type="text"
            id="total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Process Payment
        </button>
      </form>
    </div>
  );
};

export default OrderList;
