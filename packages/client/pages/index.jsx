import { useState, useEffect } from 'react';
import Navbar from '../src/components/Navbar/Navbar';
import Slider from '../src/components/Slider/Slider';
import Categories from '../src/components/Category/Categories';
import Footer from '../src/components/Footer/Footer';
import CannotAccessMessage from '../src/components/utils/CannotAccess';
import PropertyList from '../src/components/Property/PropertyList';
import FilterSection from '../src/components/Navbar/FilterSection';

const Home = () => {
  const [role, setRole] = useState('');
  const [searchCriteria, setSearchCriteria] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div>
      <Navbar />
      {role === 'tenant_role' ? (
        <CannotAccessMessage role={role} />
      ) : (
        <div>
          <Slider />
          <Categories />
          <FilterSection />
          <PropertyList searchCriteria={searchCriteria} />
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
