
import React from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate, formatTime } from "@/utils/dateUtils";
import { Expense, Category } from "@/types/expense";
import { 
  Trash2, 
  Calendar, 
  Clock,
  MoreVertical
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExpenseItemProps {
  expense: Expense;
  category: Category | undefined;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseItem = ({ expense, category, onDelete, onEdit }: ExpenseItemProps) => {
  return (
    <Card className="p-4 mb-2 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white"
            )}
            style={{ backgroundColor: category?.color || "#ccc" }}
          >
            {category?.name.charAt(0) || "?"}
          </div>
          
          <div className="space-y-1">
            <div className="font-medium">{category?.name || "Unknown Category"}</div>
            
            {expense.description && (
              <p className="text-sm text-muted-foreground">{expense.description}</p>
            )}
            
            <div className="flex items-center text-xs text-muted-foreground space-x-2">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(expense.date)}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(expense.date)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="font-bold">{formatCurrency(expense.amount)}</div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(expense)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(expense.id)}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItem;
