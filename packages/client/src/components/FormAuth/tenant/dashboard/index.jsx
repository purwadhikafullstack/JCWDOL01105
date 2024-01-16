import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import {
  AmazonLogo,
  Buildings,
  ChartLineUp,
  House,
  UserCircle,
} from '@phosphor-icons/react';
import Home from './Home';
import Property from './Property';
import ReportSales from './ReportSales';
import TenantProfile from './TenantProfile';
import Transaction from './Transaction';
import CannotAccessMessage from '../../../utils/CannotAccess';

const Dashboard = () => {
  const [selected, setSelected] = useState('Home');
  const [role, setRole] = useState('user_role');
  const [showMenu, setShowMenu] = useState(false);

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

  const menuItems = [
    { label: 'Home', icon: House, key: 'Home' },
    { label: 'Property', icon: Buildings, key: 'Property' },
    { label: 'Transaction', icon: AmazonLogo, key: 'Transaction' },
    { label: 'Report Sales', icon: ChartLineUp, key: 'Report Sales' },
    { label: 'Tenant Profile', icon: UserCircle, key: 'Tenant Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {role === 'user_role' ? (
        <CannotAccessMessage role={role} />
      ) : (
        <div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/5 p-4 text-black rounded-lg shadow-color-pallete3 bg-color-primary lg:h-screen">
              <button
                className=" lg:hidden w-full py-2 px-4 text-gray-800 hover:bg-gray-200"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaBars className="w-6 h-6 mr-2" />
              </button>
              <div className={`lg:hidden ${showMenu ? 'block' : 'hidden'}`}>
                {menuItems.map((item) => (
                  <button
                    key={item.key}
                    className="flex items-center justify-center w-full py-2 px-4 text-gray-800 hover:bg-gray-200"
                    onClick={() => setSelected(item.key)}
                  >
                    <item.icon className="w-6 h-6 mr-2" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="ml-10 hidden lg:block">
                {menuItems.map((item) => (
                  <button
                    key={item.key}
                    className="flex items-center justify-center w-60 h-20 normal-case rounded-md transition-transform transform hover:bg-color-pallete3 hover:text-white hover:scale-105"
                    onClick={() => setSelected(item.key)}
                  >
                    <item.icon className="w-6 h-6 transform hover:scale-125" />
                    <span className="ml-2 transition-transform transform hover:scale-105">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-200 w-full lg:w-4/5 p-4">
              {renderSelected()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
