
import React from "react";
import { Button } from "@/components/ui/button";
import { QuickAddButton as QuickAddButtonType } from "@/types/expense";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";

interface QuickAddButtonProps {
  button?: QuickAddButtonType;
  categoryName?: string;
  onPress: () => void;
  isAdd?: boolean;
}

const QuickAddButton = ({ button, categoryName, onPress, isAdd = false }: QuickAddButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full h-16 flex flex-col items-center justify-center gap-1 p-2",
        isAdd ? "border-dashed border-2 hover:border-expense-500" : ""
      )}
      onClick={onPress}
    >
      {isAdd ? (
        <>
          <Plus size={16} className="text-expense-500" />
          <span className="text-xs text-muted-foreground">New Quick Add</span>
        </>
      ) : (
        <>
          <span className="text-sm font-medium truncate w-full text-center">
            {button?.name}
          </span>
          <span className="text-xs text-muted-foreground truncate w-full text-center">
            {formatCurrency(button?.amount || 0)} • {categoryName}
          </span>
        </>
      )}
    </Button>
  );
};

export default QuickAddButton;
