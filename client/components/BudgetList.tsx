
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Budget } from '../../shared/types';

export const BudgetList: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    const response = await fetch('/api/budgets');
    const data = await response.json();
    setBudgets(data);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/budgets/${id}`, {
      method: 'DELETE',
    });
    fetchBudgets();
  };

  return (
    <div className="budget-list">
      <h2>Budgets</h2>
      <Link to="/budgets/new">Add Budget</Link>
      {budgets.map((budget) => (
        <div key={budget.id} className="budget-item">
          <div>
            <p>Category ID: {budget.categoryId}</p>
            <p>Amount: {budget.amount}</p>
            <p>Start Date: {budget.startDate}</p>
            <p>End Date: {budget.endDate}</p>
          </div>
          <div>
            <Link to={`/budgets/${budget.id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(budget.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
