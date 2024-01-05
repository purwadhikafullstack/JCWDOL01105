import Dashboard from '../../src/components/FormAuth/tenant/dashboard/index';
import Link from 'next/link';

const index = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-color-primary py-4 ">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="text-color-pallete1 font-bold text-xl flex items-center">
            <img src="/logo.png" alt="logo" className="w-14 h-14" /> Tenant
            Dashbord
          </a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/tenant-dashboard">
              <a className="text-white hover:text-gray-300">Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/PropertyListing">
              <a className="text-white hover:text-gray-300">Create Property</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a className="text-white hover:text-gray-300">Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a className="text-white hover:text-gray-300">Settings</a>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <a className="text-white hover:text-gray-300">Logout</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default index;
