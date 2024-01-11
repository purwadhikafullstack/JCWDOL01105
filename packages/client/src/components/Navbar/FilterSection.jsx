import { useRouter } from 'next/router';
import querystring from 'query-string';

const FilterSection = () => {
  const router = useRouter();

  const handleSortChange = (e) => {
    const sortOption = e.target.value;

    const currentQuery = new URLSearchParams(window.location.search);
    const updatedQuery = {
      ...Object.fromEntries(currentQuery.entries()),
      sort: sortOption !== 'default' ? sortOption : undefined,
    };

    const url = querystring.stringifyUrl(
      {
        url: '/property/search',
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="flex justify-end mt-2 mr-5 relative">
      <div className="mb-4">
        <select
          onChange={handleSortChange}
          value={router.query.sort || 'default'}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="default">Sort by :</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
