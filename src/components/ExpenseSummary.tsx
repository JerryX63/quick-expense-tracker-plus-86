
import React from "react";
import { Card } from "@/components/ui/card";
import { Expense, Category, Period } from "@/types/expense";
import { formatCurrency } from "@/utils/dateUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isInPeriod } from "@/utils/dateUtils";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface ExpenseSummaryProps {
  expenses: Expense[];
  categories: Category[];
  period: Period;
  onPeriodChange: (period: Period) => void;
}

const ExpenseSummary = ({
  expenses,
  categories,
  period,
  onPeriodChange,
}: ExpenseSummaryProps) => {
  // Filter expenses by period
  const filteredExpenses = expenses.filter((expense) =>
    isInPeriod(expense.date, period)
  );

  // Calculate total expenses
  const total = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Calculate expenses by category
  const expensesByCategory = categories.map((category) => {
    const categoryExpenses = filteredExpenses.filter(
      (expense) => expense.categoryId === category.id
    );
    const amount = categoryExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return {
      id: category.id,
      name: category.name,
      value: amount,
      color: category.color,
    };
  }).filter(item => item.value > 0);

  // Sort by amount (highest first)
  expensesByCategory.sort((a, b) => b.value - a.value);

  const renderPieChart = () => {
    if (expensesByCategory.length === 0) {
      return <div className="text-center text-muted-foreground p-4">No expenses in this period</div>;
    }

    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={expensesByCategory}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {expensesByCategory.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Expense Summary</h2>
        <Select value={period} onValueChange={(v) => onPeriodChange(v as Period)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-center mb-4">
        <div className="text-muted-foreground">Total Spent</div>
        <div className="text-3xl font-bold text-expense-600">{formatCurrency(total)}</div>
      </div>

      {renderPieChart()}

      <div className="mt-4 space-y-2">
        {expensesByCategory.map((category) => (
          <div key={category.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
            </div>
            <span className="font-medium">{formatCurrency(category.value)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExpenseSummary;
