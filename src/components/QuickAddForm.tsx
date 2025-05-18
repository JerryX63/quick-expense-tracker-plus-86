import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { addQuickAddButton } from "@/utils/storage";
import { QuickAddButton, Category } from "@/types/expense";
import { generateId } from "@/utils/dateUtils";
import { useToast } from "@/components/ui/use-toast";
interface QuickAddFormProps {
  categories: Category[];
  onSuccess: () => void;
  onCancel: () => void;
}
const QuickAddForm = ({
  categories,
  onSuccess,
  onCancel
}: QuickAddFormProps) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !categoryId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields"
      });
      return;
    }
    const newButton: QuickAddButton = {
      id: generateId(),
      name,
      amount: parseFloat(amount),
      categoryId
    };
    addQuickAddButton(newButton);
    toast({
      title: "Quick add button created",
      description: "Your quick add button has been created successfully"
    });
    onSuccess();
  };
  return <div className="w-full p-4 bg-white rounded-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create Quick Add</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Button Name</Label>
          <Input id="name" placeholder="Lunch" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (Rs)</Label>
          <Input id="amount" type="number" step="0.01" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{
                  backgroundColor: category.color
                }} />
                    {category.name}
                  </div>
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="pt-4">
          <Button type="submit" className="w-full bg-expense-500 hover:bg-expense-600">
            Create Button
          </Button>
        </div>
      </form>
    </div>;
};
export default QuickAddForm;