import React from 'react';

const TenantProfile = () => {
  const tenantData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage:
      'https://i.pinimg.com/564x/ec/27/00/ec27003cdef6de7e3a1e3abaac9c0d26.jpg',
    address: '123 Main Street, City, Country',
    phoneNumber: '+1234567890',
    dateOfBirth: '1990-01-01',
    // Tambahkan informasi lainnya jika diperlukan
  };

  const { name, email, profileImage, address, phoneNumber, dateOfBirth } =
    tenantData;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Tenant Profile</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Tenant Information</h3>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1">
            <p>
              <span className="font-semibold">Name:</span> {name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {address}
            </p>
            <p>
              <span className="font-semibold">Phone Number:</span> {phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span>{' '}
              {dateOfBirth}
            </p>
            {/* Tambahkan informasi lainnya tentang penyewa */}
          </div>
          <div className="sm:ml-4 mt-4 sm:mt-0">
            <img
              src={profileImage}
              alt="Tenant Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        </div>
      </div>
      {/* Informasi lainnya tentang penyewa */}
      {/* Tambahkan bagian lainnya tentang informasi penyewa seperti alamat, nomor telepon, dsb. */}
    </div>
  );
};

export default TenantProfile;
