
export interface Expense {
  id: string;
  amount: number;
  categoryId: string;
  description: string;
  date: string; // ISO string
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface QuickAddButton {
  id: string;
  name: string;
  amount: number;
  categoryId: string;
}

export type Period = 'day' | 'week' | 'month' | 'year' | 'all';
