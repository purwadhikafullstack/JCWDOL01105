import React from 'react';
import FormLogin from '../../src/components/FormAuth/user/FormLogin';
import { toast } from 'react-toastify';
import Image from 'next/image';
import logo from '../../public/logo.png';

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
          'linear-gradient(to bottom right, #4a785e, #b4daa7, #f9f9f9)',
      }}
    >
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-4">
        <div className="md:order-2 md:ml-2 mt-20">
          <Image
            src={logo}
            alt="logo"
            className="mt-5"
            width={500}
            height={500}
          />
        </div>
        <div className="md:order-2 md:ml-2 mb-auto md:mt-20 md:mb-0">
          <FormLogin className="mb-10" showToast={showToast} />
        </div>
      </div>
    </div>
  );
};

export default authRegister;
