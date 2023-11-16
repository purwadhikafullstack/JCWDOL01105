import Link from 'next/link';
import Login from '../Login/Login';
import About from '../About/About';
import Footer from '../Footer/Footer';

const Navbar = () => {
  return (
    <div>
      <header className="nav-header flex bg-color-pallete1 shadow-xl">
        <div className="flex md:flex-row flex-col gap-2 justify-between md:items-center p-4">
          <Link href="/" className="">
            RENAFIN
          </Link>
          <Login />
          <About />
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default Navbar;
