
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from '../../shared/types';

export const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    setTransactions(data);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });
    fetchTransactions();
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <Link to="/transactions/new">Add Transaction</Link>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="transaction-item">
          <div>
            <p>Amount: {transaction.amount}</p>
            <p>Description: {transaction.description}</p>
            <p>Date: {transaction.date}</p>
            <p>Category ID: {transaction.categoryId}</p>
          </div>
          <div>
            <Link to={`/transactions/${transaction.id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
