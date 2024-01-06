// PropertyCategoryComponent.js
import React, { useState } from 'react';

const PropertyCategoryComponent = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category A', description: 'Description A' },
    { id: 2, name: 'Category B', description: 'Description B' },
  ]);

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (categoryId, updatedCategory) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId ? updatedCategory : category,
    );
    setCategories(updatedCategories);
  };

  const deleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId,
    );
    setCategories(updatedCategories);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Property Category Management</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-bold mb-2">Categories</h3>
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-300 py-2">
            <p className="text-lg">{category.name}</p>
            <p className="text-sm text-gray-600">{category.description}</p>
            <div className="flex mt-2">
              <button
                onClick={() => deleteCategory(category.id)}
                className="bg-color-red text-white py-1 px-2 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  updateCategory(category.id /* updated category data */)
                }
                className="bg-color-blue text-white py-1 px-2 rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Add Category</h3>
          {/* Form untuk menambah category */}
          {/* ... */}
          <button
            onClick={() => addCategory(/* new category data */)}
            className="bg-color-green text-white py-1 px-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCategoryComponent;
