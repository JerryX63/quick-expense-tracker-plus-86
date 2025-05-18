
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseItem from "@/components/ExpenseItem";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseSummary from "@/components/ExpenseSummary";
import QuickAddButton from "@/components/QuickAddButton";
import QuickAddForm from "@/components/QuickAddForm";
import CategoryForm from "@/components/CategoryForm";
import { Expense, Category, QuickAddButton as QuickAddButtonType, Period } from "@/types/expense";
import {
  getExpenses,
  getCategories,
  getQuickAddButtons,
  addExpense,
  deleteExpense,
  updateExpense,
} from "@/utils/storage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, PlusCircle } from "lucide-react";
import { getCurrentDateTimeISO, generateId } from "@/utils/dateUtils";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  // State management
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [quickAddButtons, setQuickAddButtons] = useState<QuickAddButtonType[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("month");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showQuickAddForm, setShowQuickAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const { toast } = useToast();
  
  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);
  
  // Reload data when forms are closed
  const loadData = () => {
    setExpenses(getExpenses());
    setCategories(getCategories());
    setQuickAddButtons(getQuickAddButtons());
  };
  
  // Handle quick add button press
  const handleQuickAdd = (button: QuickAddButtonType) => {
    const newExpense: Expense = {
      id: generateId(),
      amount: button.amount,
      categoryId: button.categoryId,
      description: button.name,
      date: getCurrentDateTimeISO(),
    };
    
    addExpense(newExpense);
    toast({
      title: "Expense added",
      description: `Added ${button.name} expense`,
    });
    loadData();
  };
  
  // Handle expense deletion
  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
    toast({
      title: "Expense deleted",
      description: "Your expense has been deleted",
    });
    loadData();
  };
  
  // Handle expense edit
  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };
  
  // Get category by ID
  const getCategoryById = (id: string) => {
    return categories.find((cat) => cat.id === id);
  };
  
  // Handle form close
  const handleFormClose = () => {
    setShowExpenseForm(false);
    setShowQuickAddForm(false);
    setShowCategoryForm(false);
    setEditingExpense(null);
    loadData();
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-expense-600">ExpenseTracker</h1>
      </header>
      
      <div className="px-4 py-2">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="quick">Quick Add</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <ExpenseSummary
              expenses={expenses}
              categories={categories}
              period={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
            
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Recent Expenses</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("history")}
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-2">
              {expenses.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No expenses yet. Add your first expense!
                </div>
              ) : (
                expenses
                  .slice()
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 3)
                  .map((expense) => (
                    <ExpenseItem
                      key={expense.id}
                      expense={expense}
                      category={getCategoryById(expense.categoryId)}
                      onDelete={handleDeleteExpense}
                      onEdit={handleEditExpense}
                    />
                  ))
              )}
            </div>
            
            <div className="pt-4">
              <Button
                className="w-full bg-expense-500 hover:bg-expense-600"
                size="lg"
                onClick={() => setShowExpenseForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Expense
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-2">
                {expenses.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No expenses yet. Add your first expense!
                  </div>
                ) : (
                  expenses
                    .slice()
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((expense) => (
                      <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        category={getCategoryById(expense.categoryId)}
                        onDelete={handleDeleteExpense}
                        onEdit={handleEditExpense}
                      />
                    ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="quick" className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Quick Add Buttons</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCategoryForm(true)}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> New Category
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {quickAddButtons.map((button) => (
                <QuickAddButton
                  key={button.id}
                  button={button}
                  categoryName={getCategoryById(button.categoryId)?.name}
                  onPress={() => handleQuickAdd(button)}
                />
              ))}
              <QuickAddButton
                isAdd={true}
                onPress={() => setShowQuickAddForm(true)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          className="h-14 w-14 rounded-full shadow-lg bg-expense-500 hover:bg-expense-600"
          size="icon"
          onClick={() => setShowExpenseForm(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Dialogs */}
      <Dialog open={showExpenseForm} onOpenChange={setShowExpenseForm}>
        <DialogContent className="sm:max-w-md p-0">
          <ExpenseForm
            categories={categories}
            onSuccess={handleFormClose}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showQuickAddForm} onOpenChange={setShowQuickAddForm}>
        <DialogContent className="sm:max-w-md p-0">
          <QuickAddForm
            categories={categories}
            onSuccess={handleFormClose}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showCategoryForm} onOpenChange={setShowCategoryForm}>
        <DialogContent className="sm:max-w-md p-0">
          <CategoryForm
            onSuccess={handleFormClose}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
