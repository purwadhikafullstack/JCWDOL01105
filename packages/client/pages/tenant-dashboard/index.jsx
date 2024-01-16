import Dashboard from '../../src/components/FormAuth/tenant/dashboard/index';
import Link from 'next/link';
import { useRouter } from 'next/router';

const index = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <nav className="bg-color-primary py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="text-color-pallete1 font-bold text-xl flex items-center">
            <img src="/logo.png" alt="logo" className="w-14 h-14" /> Tenant
            Dashbord
          </a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/PropertyListing">
              <a className="text-white hover:text-gray-300">Create Property</a>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              <a className="text-white hover:text-gray-300">Logout</a>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default index;
