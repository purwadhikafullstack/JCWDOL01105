import React from 'react';
import FormLogin from '../../src/components/FormAuth/tenant/TenantLogin';
import { toast } from 'react-toastify';
import Image from 'next/image';
import logo from '../../public/logo.png';
import SwitchAuth from '../../src/components/FormAuth/SwitchAuth';

const authRegister = () => {
  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  };
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
      style={{
        background:
          'linear-gradient(to bottom left, #f9f9f9 , #b4daa7, #4a785e)',
      }}
    >
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-4">
        <div className="md:order-2 md:ml-2 mt-20">
          <FormLogin className="mt-10" showToast={showToast} />
        </div>
        <div className="md:order-2 md:ml-2 mt-15">
          <Image
            src={logo}
            alt="logo"
            className="mt-5"
            width={500}
            height={500}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .md\:flex-row {
            flex-direction: column-reverse;
          }
          .md\:order-1 {
            order: 2;
          }
          .md\:order-2 {
            order: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default authRegister;
