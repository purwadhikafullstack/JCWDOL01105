import { useRouter } from 'next/router';

const FilterSection = () => {
  const router = useRouter();

  const handleSort = (sortOption) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: sortOption },
    });
  };

  return (
    <div className="flex justify-end mt-2 mr-5 relative">
      <div className="mb-4">
        <select
          onChange={(e) => handleSort(e.target.value)}
          value={router.query.sort || undefined}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={undefined}>Sort by :</option>
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
