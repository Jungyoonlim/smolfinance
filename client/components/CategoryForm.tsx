
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryDTO } from '../../shared/types';

export const CategoryForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryDTO>({
    name: '',
  });

  useEffect(() => {
    if (id) {
      fetchCategory(parseInt(id));
    }
  }, [id]);

  const fetchCategory = async (id: number) => {
    const response = await fetch(`/api/categories/${id}`);
    const data = await response.json();
    setCategory(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
    } else {
      await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
    }
    navigate('/categories');
  };

  return (
    <div className="category-form">
      <h2>{id ? 'Edit Category' : 'Add Category'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};
