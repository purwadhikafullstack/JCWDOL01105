import { useState, useEffect } from 'react';
import Navbar from '../src/components/Navbar/Navbar';
import Slider from '../src/components/Slider/Slider';
import Categories from '../src/components/Category/Categories';
import Footer from '../src/components/Footer/Footer';
import CannotAccessMessage from '../src/components/utils/CannotAccess';
import PropertyList from '../src/components/Property/PropertyList';

const Home = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {role === 'tenant_role' ? (
        <CannotAccessMessage role={role} />
      ) : (
        <div>
          <Categories />
          <PropertyList />
          <Slider />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Home;
