
import { app, server } from './run_express';
import { initializeDatabase } from './db';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from './db';
import { Transaction, TransactionDTO, Category, CategoryDTO, Budget, BudgetDTO } from '../shared/types';

initializeDatabase()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((err) => {
    console.error('Error initializing database:', err);
  });

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await getTransactions();
    res.json(transactions);
  } catch (err) {
    console.error('Error retrieving transactions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/transactions', async (req, res) => {
  const transaction: TransactionDTO = req.body;
  try {
    await createTransaction(transaction);
    res.sendStatus(201);
  } catch (err) {
    console.error('Error creating transaction:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const transaction: TransactionDTO = req.body;
  try {
    await updateTransaction(id, transaction);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating transaction:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteTransaction(id);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (err) {
    console.error('Error retrieving categories:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/categories', async (req, res) => {
  const category: CategoryDTO = req.body;
  try {
    await createCategory(category);
    res.sendStatus(201);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const category: CategoryDTO = req.body;
  try {
    await updateCategory(id, category);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteCategory(id);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/budgets', async (req, res) => {
  try {
    const budgets = await getBudgets();
    res.json(budgets);
  } catch (err) {
    console.error('Error retrieving budgets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/budgets', async (req, res) => {
  const budget: BudgetDTO = req.body;
  try {
    await createBudget(budget);
    res.sendStatus(201);
  } catch (err) {
    console.error('Error creating budget:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/budgets/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const budget: BudgetDTO = req.body;
  try {
    await updateBudget(id, budget);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating budget:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/budgets/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteBudget(id);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error deleting budget:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
