import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className="bg-color-lightGrey text-white py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 lg:w-1/6 mb-8 md:mb-0">
              <h3 className="text-lg font-bold mb-4">Hosting</h3>
              <nav className="grid gap-2">
                <Link href="/">
                  <a className="hover:text-color-grey transition duration-300">
                    Jobs
                  </a>
                </Link>
                <Link href="/">
                  <a className="hover:text-color-grey transition duration-300">
                    About us
                  </a>
                </Link>
                <Link href="/">
                  <a className="hover:text-color-grey transition duration-300">
                    Press kit
                  </a>
                </Link>
              </nav>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/3 mb-8 md:mb-0">
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <nav className="grid gap-2">
                <Link href="/">
                  <a className="hover:text-color-grey transition duration-300">
                    Jobs
                  </a>
                </Link>
                <Link href="/">
                  <a className="hover:text-color-grey transition duration-300">
                    About us
                  </a>
                </Link>
                <Link href="/">
                  <a className="hover:text-color-grey transition duration-300">
                    Press kit
                  </a>
                </Link>
              </nav>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-xl hover:text-color-grey transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/*  SVG path  */}
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-color-grey transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/*  SVG path  */}
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-color-grey transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/*  SVG path  */}
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/3 mb-8 md:mb-0">
              <h3 className="text-lg font-bold mb-4">CONTACT</h3>
              <nav className="grid gap-2">
                <p>Renafin@mail.com</p>
                <p>0812341234 / Bussiness</p>
                <p>Indonesia, Jakarta</p>
              </nav>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-xl hover:text-color-grey transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/*  SVG path  */}
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-color-grey transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/*  SVG path  */}
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-gray-500 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/*  SVG path  */}
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-black mt-8 pt-8 flex justify-center items-center">
            <p className="text-color-grey text-sm">
              &copy; 2023 - All rights reserved by Renafin Property
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
