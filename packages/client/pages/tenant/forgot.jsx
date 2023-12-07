import React from 'react';
import bg from '../../public/bg-auth.jpg';
import { toast } from 'react-toastify';
import FormForgotPassword from '../../src/components/FormAuth/tenant/TenantForgot';

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
        <div className="md:order-2 md:ml-2 mb-10 w-full max-w-md">
          <FormForgotPassword className="mb-10" showToast={showToast} />
        </div>
      </div>
    </div>
  );
};

export default authRegister;
