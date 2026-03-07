import { BudgetBars } from "../components/dashboard"

export default function BudgetsPage({
  currentMonth,
  monthTransactions,
  getBudget,
  setBudget,
  getBudgetStatus,
}) {
  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Budgets</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Set monthly spending limits for each category to stay on track
        </p>
      </div>

      <BudgetBars
        transactions={monthTransactions}
        currentMonth={currentMonth}
        getBudget={getBudget}
        setBudget={setBudget}
        getBudgetStatus={getBudgetStatus}
        fullView
      />

    </div>
  )
}