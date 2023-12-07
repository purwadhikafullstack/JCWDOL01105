import Navbar from '../src/components/Navbar/Navbar';
import Slider from '../src/components/Slider/Slider';
import Destination from './app/Location/Destination';
import Categories from '../src/components/Category/Categories';
import Footer from '../src/components/Footer/Footer';
import PropertyList from '../src/components/Property/PropertyList';

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <Destination /> */}
      <Categories />
      <PropertyList />
      {/* <Slider /> */}
      <Footer />
    </div>
  );
};

export default Home;
