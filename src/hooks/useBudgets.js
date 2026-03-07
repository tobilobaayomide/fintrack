import { useLocalStorage } from "./useLocalStorage";
import toast from "react-hot-toast";

export function useBudgets() {
  const [budgets, setBudgets] = useLocalStorage("fintrack_budgets", []);

  const getBudget = (category, month) =>
    budgets.find((b) => b.category === category && b.month === month);

  const setBudget = (category, month, limit) => {
    const exists = budgets.find(
      (b) => b.category === category && b.month === month,
    );
    if (exists) {
      setBudgets((prev) =>
        prev.map((b) =>
          b.category === category && b.month === month ? { ...b, limit } : b,
        ),
      );
      toast.success("Budget updated!");
    } else {
      setBudgets((prev) => [...prev, { category, month, limit }]);
      toast.success("Budget created!");
    }
  };

  const getBudgetStatus = (category, month, spent) => {
    const budget = getBudget(category, month);
    if (!budget || budget.limit === 0) return null;
    const percentage = (spent / budget.limit) * 100;
    return {
      limit: budget.limit,
      percentage,
      isOver: percentage > 100,
      isWarning: percentage >= 75 && percentage <= 100,
      isSafe: percentage < 75,
    };
  };

  return { budgets, getBudget, setBudget, getBudgetStatus };
}
