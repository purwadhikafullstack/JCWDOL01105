'use client';
import Link from 'next/link';
import Search from './Search';
import Menu from '../Login/Menu';

const Navbar = () => {
  return (
    <div>
      <div className="navbar-container flex items-center justify-between bg-color-pallete1 p-4 shadow-md">
        <div className="font-bold text-color-primary p-2">
          <Link href="/">RENAFIN</Link>
        </div>
        <Search />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
