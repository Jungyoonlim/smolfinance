
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { CategoryList } from './components/CategoryList';
import { CategoryForm } from './components/CategoryForm';
import { BudgetList } from './components/BudgetList';
import { BudgetForm } from './components/BudgetForm';
import { Dashboard } from './components/Dashboard';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/transactions/new" element={<TransactionForm />} />
        <Route path="/transactions/:id/edit" element={<TransactionForm />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/categories/:id/edit" element={<CategoryForm />} />
        <Route path="/budgets" element={<BudgetList />} />
        <Route path="/budgets/new" element={<BudgetForm />} />
        <Route path="/budgets/:id/edit" element={<BudgetForm />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
