
export interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Budget {
  id: number;
  categoryId: number;
  amount: number;
  startDate: string;
  endDate: string;
}

export interface TransactionDTO {
  amount: number;
  description: string;
  date: string;
  categoryId: number;
}

export interface CategoryDTO {
  name: string;
}

export interface BudgetDTO {
  categoryId: number;
  amount: number;
  startDate: string;
  endDate: string;
}
