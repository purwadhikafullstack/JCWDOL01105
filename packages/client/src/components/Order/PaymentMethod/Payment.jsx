// PaymentProcessor.jsx
import React, { useEffect, useState } from 'react';
import { RiBankCardLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import axios from 'axios';

const PaymentProcessor = ({ singleOrder, onPaymentProcessed, showToast }) => {
  const [token, setTokenState] = useState('');
  const [name, setName] = useState('');
  const [orderId, setOrderId] = useState('');
  const [total, setTotal] = useState(0);

  const router = useRouter();

  async function processPayment() {
    const { User, id, total_invoice } = singleOrder || {};

    const data = {
      name: User?.name || '',
      order_id: id || '',
      total: total_invoice || '',
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/orders/payment',
        data,
        config,
      );

      if (response.status === 200) {
        setTokenState(response.data.data);
        setName(User?.name || '');
        setOrderId(id || '');
        setTotal(total_invoice || 0);
        onPaymentProcessed(User?.name || '', id || '', total_invoice || 0);
        showToast('Payment success', 'success');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Payment failed', 'error');
    }
  }

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

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem('Pembayaran', JSON.stringify(result));
          setTokenState('');
          onPaymentProcessed(name, orderId, total);
          showToast('Payment success', 'success');
          setTimeout(() => {
            router.reload();
          }, 1000);
        },
        onPending: (result) => {
          localStorage.setItem('Pembayaran', JSON.stringify(result));
          setTokenState('');
          onPaymentProcessed(name, orderId, total);
          showToast('Payment success', 'success');
          setTimeout(() => {
            router.reload();
          }, 1000);
        },
        onError: (error) => {
          console.error('Error:', error);
          setTokenState('');
          onPaymentProcessed(name, orderId, total);
          showToast('Payment failed', 'error');
          setTimeout(() => {
            router.reload();
          }, 1000);
        },
        onClose: () => {
          console.log(
            'Customer closed the popup without finishing the payment',
          );
        },
      });
    }
  }, [token]);

  return (
    <button
      className="btn btn-square rounded-lg btn-ghost normal-case aspect-square w-full h-full shadow-sm hover:shadow-md bg-color-pallete3"
      onClick={() => {
        processPayment();
      }}
    >
      <div className="flex flex-col gap-2 justify-center items-center">
        <RiBankCardLine className="text-3xl sm:text-4xl" />
        <p className="text-md sm:text-lg font-medium">Automatic</p>
      </div>
    </button>
  );
};

export default PaymentProcessor;
