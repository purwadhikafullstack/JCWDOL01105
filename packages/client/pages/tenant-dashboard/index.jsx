import Image from 'next/image';
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
    <nav className="bg-color-primary py-4 ">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <Link href="/">
          <a className="text-color-pallete1 font-bold text-xl flex items-center">
            <Image
              src="/logo.png"
              alt="logo"
              className="w-14 h-14"
              width={150}
              height={150}
            />{' '}
            Tenant Dashbord
          </a>
        </Link>
        <ul className="flex flex-row lg:flex-row lg:space-x-4">
          <li>
            <Link href="/tenant-dashboard">
              <a className="text-white hover:text-gray-300">Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/propertyListing">
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
            <Link href="/">
              <button onClick={handleLogout}>
                <Link className="text-white hover:text-gray-300">Logout</Link>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default index;
