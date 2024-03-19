
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../shared/types';

export const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });
    fetchCategories();
  };

  return (
    <div className="category-list">
      <h2>Categories</h2>
      <Link to="/categories/new">Add Category</Link>
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <div>
            <p>Name: {category.name}</p>
          </div>
          <div>
            <Link to={`/categories/${category.id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
