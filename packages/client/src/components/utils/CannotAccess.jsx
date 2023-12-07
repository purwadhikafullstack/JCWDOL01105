import React from 'react';

const CannotAccessMessage = ({ role }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p className="mb-2">
          {role === 'tenant_role'
            ? 'You are a tenant and cannot access this page.'
            : 'You are not authorized to access this page.'}
        </p>
        <p className="mb-2">
          Please contact your administrator for assistance.
        </p>
        {/* Tambahan informasi atau tautan jika diperlukan */}
      </div>
    </div>
  );
};

export default CannotAccessMessage;
