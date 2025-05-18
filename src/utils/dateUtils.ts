
import { format, parse, isToday, isThisWeek, isThisMonth, isThisYear, parseISO } from 'date-fns';
import { Period } from '@/types/expense';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: string): string => {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'MMM dd, yyyy');
};

export const formatTime = (date: string): string => {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'hh:mm a');
};

export const formatDateTime = (date: string): string => {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'MMM dd, yyyy - hh:mm a');
};

export const isInPeriod = (date: string, period: Period): boolean => {
  const parsedDate = parseISO(date);
  
  switch (period) {
    case 'day':
      return isToday(parsedDate);
    case 'week':
      return isThisWeek(parsedDate);
    case 'month':
      return isThisMonth(parsedDate);
    case 'year':
      return isThisYear(parsedDate);
    case 'all':
      return true;
    default:
      return false;
  }
};

export const getCurrentDateTimeISO = (): string => {
  return new Date().toISOString();
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
