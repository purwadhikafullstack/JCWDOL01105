import React from 'react';

const UserLoginModal = ({ isOpen, onClose, onUserLogin, onTenantLogin }) => {
  const handleUserLogin = () => {
    onClose();
    onUserLogin(); // Lakukan navigasi ke /user/login
  };

  const handleTenantLogin = () => {
    onClose();
    onTenantLogin(); // Lakukan navigasi ke /tenant/login
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 h-4/10 p-6 rounded-lg shadow-lg bg-color-primary">
            <div className="text-center mb-6">
              <p className="text-xl font-bold mb-2 text-color-pallete1">
                Masuk ke Renafin Rent
              </p>
              <p className="text-sm text-color-pallete1">
                Saya ingin masuk sebagai
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="flex items-center border border-gray-300 p-2 rounded-lg cursor-pointer bg-color-pallete1"
                onClick={handleUserLogin}
              >
                <img
                  src="/user.png"
                  alt="login-tenant"
                  className="w-12 h-12 mr-4"
                />
                <p className="text-sm font-semibold">User</p>
              </div>
              <div
                className="flex items-center border border-gray-300 p-2 rounded-lg cursor-pointer bg-color-pallete3"
                onClick={handleTenantLogin}
              >
                <img
                  src="/user.png"
                  alt="login-owner"
                  className="w-12 h-12 mr-4"
                />
                <p className="text-sm font-semibold">Tenant</p>
              </div>
            </div>
            <button
              className="mt-5 mb-3 w-16 rounded-md bg-color-pallete1 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLoginModal;
