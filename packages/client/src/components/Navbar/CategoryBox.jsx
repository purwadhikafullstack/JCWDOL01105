'use client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import querystring from 'query-string';

const CategoryBox = ({ icon, label, onCategoryClick }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const currentQuery = new URLSearchParams(window.location.search);
    const categoriesParam = currentQuery.get('category');

    const updatedQuery = {
      ...Object.fromEntries(currentQuery.entries()),
      category: label,
    };

    if (categoriesParam === label) {
      delete updatedQuery.category;
    }

    const url = querystring.stringifyUrl(
      {
        url: '/property/search',
        query: updatedQuery,
      },
      { skipNull: true },
    );

    onCategoryClick(label);
    router.push(url);
  }, [label, onCategoryClick, router]);

  const isActive = router.query.category === label;

  return (
    <div className={`cat-container border-b ${isActive ? 'active' : ''}`}>
      <div
        onClick={handleClick}
        className="flex flex-col items-center justify-center gap-2 p-3 cursor-pointer"
      >
        {icon}
        <div className="font-medium text-sm">{label}</div>
      </div>
    </div>
  );
};

export default CategoryBox;
