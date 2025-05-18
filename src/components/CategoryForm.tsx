
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { addCategory } from "@/utils/storage";
import { Category } from "@/types/expense";
import { generateId } from "@/utils/dateUtils";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface CategoryFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ColorOptions = [
  "#00dac0",
  "#407BFF",
  "#FF7043",
  "#FF4081",
  "#6C63FF",
  "#AA00FF",
  "#00B8D4",
  "#00C853",
  "#FFD600",
  "#FF6D00",
];

const CategoryForm = ({ onSuccess, onCancel }: CategoryFormProps) => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>(ColorOptions[0]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a category name",
      });
      return;
    }

    const newCategory: Category = {
      id: generateId(),
      name,
      color,
      icon: 'default', // We're not using icons in this basic version
    };

    addCategory(newCategory);
    toast({
      title: "Category created",
      description: "Your category has been created successfully",
    });
    onSuccess();
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create Category</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            placeholder="Food, Transport, etc."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Color</Label>
          <div className="grid grid-cols-5 gap-2">
            {ColorOptions.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                className={cn(
                  "w-full aspect-square rounded-full",
                  color === colorOption ? "ring-2 ring-black ring-offset-2" : ""
                )}
                style={{ backgroundColor: colorOption }}
                onClick={() => setColor(colorOption)}
              />
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-expense-500 hover:bg-expense-600"
          >
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
