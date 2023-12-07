import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const ToggleSwitch = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [displayText, setDisplayText] = useState('Toggle me');

  useEffect(() => {
    setDisplayText(
      router.pathname.includes('/tenant')
        ? 'Toggle me for User Register'
        : 'Toggle me for Tenant Register',
    );
    setIsChecked(router.pathname.includes('/user'));
  }, [router.pathname]);

  const handleToggle = () => {
    if (router.pathname.includes('/tenant')) {
      router.push('/user/register');
    } else if (router.pathname.includes('/user')) {
      router.push('/tenant/register');
    }
  };

  return (
    <label
      className="mt-10 relative inline-flex items-center cursor-pointer "
      style={{ maxWidth: '200px' }}
    >
      <input
        type="checkbox"
        value=""
        className="sr-only peer bg-[#4285F4] hover:bg-[#4285F4]/90"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div
        className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {displayText}
      </span>
    </label>
  );
};

export default ToggleSwitch;
