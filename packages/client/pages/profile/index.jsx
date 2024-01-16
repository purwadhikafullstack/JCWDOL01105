import React, { useEffect, useState } from 'react';
import ProfilePicture from '../../src/components/Profile/ProfilePicture';
import ChangePassword from '../../src/components/Profile/ChangePassword';
import UserProfile from '../../src/components/Profile/UserProfile';
import Navbar from '../../src/components/Navbar/Navbar';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProfilePage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
    } else if (type === 'error') {
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    } else {
      toast(message, { position: toast.POSITION.TOP_CENTER });
    }
  };

  useEffect(() => {
    const isGoogleLogin = localStorage.getItem('isGoogleLogin') === 'true';
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthorized(true);
    }

    if (isGoogleLogin) {
      setIsGoogleLogin(true);
    }
  }, []);

  const handlePasswordChange = () => {
    if (isGoogleLogin) {
      showToast('You cannot change your password with google account', 'error');
    }
  };

  if (!isAuthorized) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="text-gray-600">
              Oops! The page you are looking for could not be found.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              {' '}
              Go back to Home{' '}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div>
        <div
          className="mt-8 container mx-auto border border-gray-300 p-4 rounded-md mb-5"
          style={{
            background:
              'linear-gradient(to bottom right, #4a785e, #f9f9f9, #b4daa7)',
          }}
        >
          <ProfilePicture showToast={showToast} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <UserProfile showToast={showToast} />
            </div>
            <div>
              {!isGoogleLogin && (
                <ChangePassword
                  showToast={showToast}
                  isGoogleLogin={isGoogleLogin}
                  onChangePassword={handlePasswordChange}
                />
              )}
              {isGoogleLogin && (
                <div className="bg-gray-100 shadow sm:rounded-lg p-6 mt-5">
                  <p>
                    Change Password feature is not available for Google
                    logged-in users.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
