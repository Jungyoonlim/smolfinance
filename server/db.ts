const Database = require('better-sqlite3');
const db = new Database('database.db');

export function initializeDatabase() {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          description TEXT NOT NULL,
          date TEXT NOT NULL,
          categoryId INTEGER NOT NULL,
          FOREIGN KEY (categoryId) REFERENCES categories (id)
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          db.run(`
            CREATE TABLE IF NOT EXISTS categories (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL
            )
          `, (err) => {
            if (err) {
              reject(err);
            } else {
              db.run(`
                CREATE TABLE IF NOT EXISTS budgets (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  categoryId INTEGER NOT NULL,
                  amount REAL NOT NULL,
                  startDate TEXT NOT NULL,
                  endDate TEXT NOT NULL,
                  FOREIGN KEY (categoryId) REFERENCES categories (id)
                )
              `, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            }
          });
        }
      });
    });
  });
}

export function getTransactions() {
  return new Promise<Transaction[]>((resolve, reject) => {
    db.all('SELECT * FROM transactions', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function createTransaction(transaction: TransactionDTO) {
  return new Promise<void>((resolve, reject) => {
    db.run(
      'INSERT INTO transactions (amount, description, date, categoryId) VALUES (?, ?, ?, ?)',
      [transaction.amount, transaction.description, transaction.date, transaction.categoryId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function updateTransaction(id: number, transaction: TransactionDTO) {
  return new Promise<void>((resolve, reject) => {
    db.run(
      'UPDATE transactions SET amount = ?, description = ?, date = ?, categoryId = ? WHERE id = ?',
      [transaction.amount, transaction.description, transaction.date, transaction.categoryId, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function deleteTransaction(id: number) {
  return new Promise<void>((resolve, reject) => {
    db.run('DELETE FROM transactions WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getCategories() {
  return new Promise<Category[]>((resolve, reject) => {
    db.all('SELECT * FROM categories', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function createCategory(category: CategoryDTO) {
  return new Promise<void>((resolve, reject) => {
    db.run('INSERT INTO categories (name) VALUES (?)', [category.name], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function updateCategory(id: number, category: CategoryDTO) {
  return new Promise<void>((resolve, reject) => {
    db.run('UPDATE categories SET name = ? WHERE id = ?', [category.name, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function deleteCategory(id: number) {
  return new Promise<void>((resolve, reject) => {
    db.run('DELETE FROM categories WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getBudgets() {
  return new Promise<Budget[]>((resolve, reject) => {
    db.all('SELECT * FROM budgets', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function createBudget(budget: BudgetDTO) {
  return new Promise<void>((resolve, reject) => {
    db.run(
      'INSERT INTO budgets (categoryId, amount, startDate, endDate) VALUES (?, ?, ?, ?)',
      [budget.categoryId, budget.amount, budget.startDate, budget.endDate],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function updateBudget(id: number, budget: BudgetDTO) {
  return new Promise<void>((resolve, reject) => {
    db.run(
      'UPDATE budgets SET categoryId = ?, amount = ?, startDate = ?, endDate = ? WHERE id = ?',
      [budget.categoryId, budget.amount, budget.startDate, budget.endDate, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function deleteBudget(id: number) {
  return new Promise<void>((resolve, reject) => {
    db.run('DELETE FROM budgets WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
