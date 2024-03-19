
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transaction, Category, Budget } from '../../shared/types';

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchBudgets();
  }, []);

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    setTransactions(data);
  };

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data);
  };

  const fetchBudgets = async () => {
    const response = await fetch('/api/budgets');
    const data = await response.json();
    setBudgets(data);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-item">
        <h2>Recent Transactions</h2>
        {transactions.slice(0, 5).map((transaction) => (
          <div key={transaction.id}>
            <p>Amount: {transaction.amount}</p>
            <p>Description: {transaction.description}</p>
            <p>Date: {transaction.date}</p>
          </div>
        ))}
        <Link to="/transactions">View All Transactions</Link>
      </div>
      <div className="dashboard-item">
        <h2>Categories</h2>
        {categories.map((category) => (
          <div key={category.id}>
            <p>Name: {category.name}</p>
          </div>
        ))}
        <Link to="/categories">Manage Categories</Link>
      </div>
      <div className="dashboard-item">
        <h2>Budgets</h2>
        {budgets.map((budget) => (
          <div key={budget.id}>
            <p>Category ID: {budget.categoryId}</p>
            <p>Amount: {budget.amount}</p>
            <p>Start Date: {budget.startDate}</p>
            <p>End Date: {budget.endDate}</p>
          </div>
        ))}
        <Link to="/budgets">Manage Budgets</Link>
      </div>
    </div>
  );
};
