'use client';

import {
  AmazonLogo,
  Buildings,
  ChartLineUp,
  House,
  UserCircle,
} from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

import Home from './Home';
import Property from './Property';
import ReportSales from './ReportSales';
import TenantProfile from './TenantProfile';
import Transaction from './Transaction';
import CannotAccessMessage from '../../../utils/CannotAccess';

const Dashboard = () => {
  const [selected, setSelected] = useState('Home');
  const [role, setRole] = useState('user_role');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const renderSelected = () => {
    if (selected === 'Home') {
      return <Home />;
    } else if (selected === 'Property') {
      return <Property />;
    } else if (selected === 'Report Sales') {
      return <ReportSales />;
    } else if (selected === 'Tenant Profile') {
      return <TenantProfile />;
    } else if (selected === 'Transaction') {
      return <Transaction />;
    }
  };

  return (
    <div>
      {role === 'user_role' ? (
        <CannotAccessMessage role={role} />
      ) : (
        <div>
          <div className="lg:flex min-h-screen">
            <div className="bg-color-primary w-full lg:w-1/4 p-4 text-black shadow-lg flex flex-col items-center">
              <div className="grid grid-cols-1 gap-2 text-center">
                <button
                  className="flex items-center justify-center w-60 h-20 normal-case rounded-md transition-transform transform hover:bg-color-pallete3 hover:text-white hover:scale-105"
                  onClick={() => setSelected('Home')}
                >
                  <House className="w-6 h-6 transform hover:scale-125" />
                  <span className="ml-2 transition-transform transform hover:scale-105">
                    Home
                  </span>
                </button>
                <button
                  className="flex items-center justify-center w-60 h-20 normal-case hover:bg-color-pallete3 hover:text-white hover:rounded-md"
                  onClick={() => setSelected('Property')}
                >
                  <Buildings className="w-6 h-6 transform hover:scale-125" />
                  <span className="ml-2 transition-transform transform hover:scale-105">
                    Property
                  </span>
                </button>
                <button
                  className="flex items-center justify-center w-60 h-20 normal-case hover:bg-color-pallete3 hover:text-white hover:rounded-md"
                  onClick={() => setSelected('Transaction')}
                >
                  <AmazonLogo className="w-6 h-6 transform hover:scale-125" />
                  <span className="ml-2 transition-transform transform hover:scale-105">
                    Transaction
                  </span>
                </button>
                <button
                  className="flex items-center justify-center w-60 h-20 normal-case hover:bg-color-pallete3 hover:text-white hover:rounded-md"
                  onClick={() => setSelected('Report Sales')}
                >
                  <ChartLineUp className="w-6 h-6 transform hover:scale-125" />
                  <span className="ml-2 transition-transform transform hover:scale-105">
                    Report Sales
                  </span>
                </button>
                <button
                  className="flex items-center justify-center w-60 h-20 normal-case hover:bg-color-pallete3 hover:text-white hover:rounded-md"
                  onClick={() => setSelected('Tenant Profile')}
                >
                  <UserCircle className="w-6 h-6 transform hover:scale-125" />
                  <span className="ml-2 transition-transform transform hover:scale-105">
                    Tenant Profile
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-gray-100 w-full lg:w-5/6 p-4 overflow-y-auto">
              {renderSelected()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
