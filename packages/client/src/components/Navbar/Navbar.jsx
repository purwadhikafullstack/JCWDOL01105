'use client';

import Link from 'next/link';
import Search from './Search';
import Menu from '../Menu/Menu';

const Navbar = () => {
  return (
    <div>
      <nav className="nav-container flex bg-color-pallete1 md:flex-row flex-col gap-2 justify-between md:items-center p-4  text-color-primary shadow-xl">
        <Link href="/">RENAFIN</Link>
        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Navbar;
