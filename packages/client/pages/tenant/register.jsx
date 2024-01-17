import React from 'react';
import FormRegister from '../../src/components/FormAuth/tenant/TenantRegister';
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
      className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center relative"
      style={{
        background:
          'linear-gradient(to bottom right, #f9f9f9 , #b4daa7, #4a785e)',
      }}
    >
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-4">
        <div className="md:order-2 md:ml-2 mt-10">
          <FormRegister className="mb-10" showToast={showToast} />
        </div>
        <div className="md:order-2 md:ml-2 mt-20">
          <Image
            src={logo}
            alt="logo"
            className="mt-5"
            width={300}
            height={300}
          />
        </div>
      </div>

      <style>{`
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
          .switch-auth-container {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 5rem;
            margin-bottom: 5rem;
          }
        }

        @media (max-width: 480px) {
          .switch-auth-container {
            position: static;
            margin-top: 5rem;
          }
        }
      `}</style>
      <div className="switch-auth-container">
        <SwitchAuth />
      </div>
    </div>
  );
};

export default authRegister;
