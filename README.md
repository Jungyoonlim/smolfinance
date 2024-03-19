
# Personal Finance Dashboard App

This is a personal finance dashboard app facilitated by AI. 

## Routes

- `/`: The root route serves the main application page.
- `/client/:file`: Serves static files from the client directory.
- `/dist/:file`: Serves static files from the dist directory.
- `/api/transactions`: API endpoint for managing transactions.
  - `GET`: Retrieves a list of transactions.
  - `POST`: Creates a new transaction.
  - `PUT /:id`: Updates an existing transaction.
  - `DELETE /:id`: Deletes a transaction.
- `/api/categories`: API endpoint for managing categories.
  - `GET`: Retrieves a list of categories.
  - `POST`: Creates a new category.
  - `PUT /:id`: Updates an existing category.
  - `DELETE /:id`: Deletes a category.
- `/api/budgets`: API endpoint for managing budgets.
  - `GET`: Retrieves a list of budgets.
  - `POST`: Creates a new budget.
  - `PUT /:id`: Updates an existing budget.
  - `DELETE /:id`: Deletes a budget.

## Database

This app uses SQLite as the database for storing transactions, categories, and budgets. The database operations are handled by the server using the `sqlite3` library.

## Socket.io

Socket.io is not used in this app as it does not require real-time communication between the server and the client.

## Running the App

To run the app, use the following command:

```
bun server/run.ts
```

This will start the server on port 8001. Open http://localhost:8001 in your browser to access the app.

