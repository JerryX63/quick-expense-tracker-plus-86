
import { Expense, Category, QuickAddButton } from "@/types/expense";

const STORAGE_KEYS = {
  EXPENSES: 'expenses',
  CATEGORIES: 'categories',
  QUICK_ADD_BUTTONS: 'quickAddButtons'
};

// Default categories
export const defaultCategories: Category[] = [
  { id: '1', name: 'Food', color: '#00dac0', icon: 'utensils' },
  { id: '2', name: 'Transport', color: '#407BFF', icon: 'car' },
  { id: '3', name: 'Entertainment', color: '#FF7043', icon: 'film' },
  { id: '4', name: 'Shopping', color: '#FF4081', icon: 'shopping-bag' },
  { id: '5', name: 'Bills', color: '#6C63FF', icon: 'file-text' }
];

// Helper functions for localStorage
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${key}`, error);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in localStorage: ${key}`, error);
  }
};

// Expense functions
export const getExpenses = (): Expense[] => {
  return getItem<Expense[]>(STORAGE_KEYS.EXPENSES, []);
};

export const addExpense = (expense: Expense): void => {
  const expenses = getExpenses();
  expenses.push(expense);
  setItem(STORAGE_KEYS.EXPENSES, expenses);
};

export const updateExpense = (updatedExpense: Expense): void => {
  const expenses = getExpenses();
  const index = expenses.findIndex(expense => expense.id === updatedExpense.id);
  if (index !== -1) {
    expenses[index] = updatedExpense;
    setItem(STORAGE_KEYS.EXPENSES, expenses);
  }
};

export const deleteExpense = (id: string): void => {
  const expenses = getExpenses();
  const filteredExpenses = expenses.filter(expense => expense.id !== id);
  setItem(STORAGE_KEYS.EXPENSES, filteredExpenses);
};

// Category functions
export const getCategories = (): Category[] => {
  return getItem<Category[]>(STORAGE_KEYS.CATEGORIES, defaultCategories);
};

export const addCategory = (category: Category): void => {
  const categories = getCategories();
  categories.push(category);
  setItem(STORAGE_KEYS.CATEGORIES, categories);
};

export const updateCategory = (updatedCategory: Category): void => {
  const categories = getCategories();
  const index = categories.findIndex(category => category.id === updatedCategory.id);
  if (index !== -1) {
    categories[index] = updatedCategory;
    setItem(STORAGE_KEYS.CATEGORIES, categories);
  }
};

export const deleteCategory = (id: string): void => {
  const categories = getCategories();
  const filteredCategories = categories.filter(category => category.id !== id);
  setItem(STORAGE_KEYS.CATEGORIES, filteredCategories);
};

// Quick Add Button functions
export const getQuickAddButtons = (): QuickAddButton[] => {
  return getItem<QuickAddButton[]>(STORAGE_KEYS.QUICK_ADD_BUTTONS, []);
};

export const addQuickAddButton = (button: QuickAddButton): void => {
  const buttons = getQuickAddButtons();
  buttons.push(button);
  setItem(STORAGE_KEYS.QUICK_ADD_BUTTONS, buttons);
};

export const updateQuickAddButton = (updatedButton: QuickAddButton): void => {
  const buttons = getQuickAddButtons();
  const index = buttons.findIndex(button => button.id === updatedButton.id);
  if (index !== -1) {
    buttons[index] = updatedButton;
    setItem(STORAGE_KEYS.QUICK_ADD_BUTTONS, buttons);
  }
};

export const deleteQuickAddButton = (id: string): void => {
  const buttons = getQuickAddButtons();
  const filteredButtons = buttons.filter(button => button.id !== id);
  setItem(STORAGE_KEYS.QUICK_ADD_BUTTONS, filteredButtons);
};
