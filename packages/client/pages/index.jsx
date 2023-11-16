import Navbar from '../components/Navbar/Navbar';
import Destination from './app/Location/Destination';
import Page from './app/page';
import Search from './app/Search/Search';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Destination />
      <Page />
      <Search />
    </div>
  );
};

export default Home;
