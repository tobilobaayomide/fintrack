import { SummaryCards, SpendingChart, BudgetBars, InsightBanner } from "../components/dashboard"
import { TransactionList } from "../components/transactions"
import { Button } from "../components/ui"
import { useNavigate } from "react-router-dom"

export default function DashboardPage({
  currentMonth,
  totals,
  monthTransactions,
  getBudget,
  setBudget,
  getBudgetStatus,
  onDeleteTransaction,
  onEditTransaction,
  onViewAll,
}) {
  const navigate = useNavigate()

  return (
    <div className="space-y-8 md:space-y-5">

      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">
          Your financial overview for{" "}
          {new Date(`${currentMonth}-01`).toLocaleString("default", {
            month: "long", year: "numeric",
          })}
        </p>
      </div>

      <InsightBanner
        transactions={monthTransactions}
        currentMonth={currentMonth}
        getBudgetStatus={getBudgetStatus}
      />

      <SummaryCards totals={totals} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SpendingChart transactions={monthTransactions} />
        <BudgetBars
          transactions={monthTransactions}
          currentMonth={currentMonth}
          getBudget={getBudget}
          setBudget={setBudget}
          getBudgetStatus={getBudgetStatus}
          compact
          onViewAll={() => navigate("/budgets")}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Recent Transactions
          </h2>
          <Button onClick={onViewAll} variant="ghost" size="sm" className="md:mr-12">
            View All
          </Button>
        </div>
        <div className="h-0.5 flex-1 bg-slate-200/80 mb-4" />

        <TransactionList
          transactions={monthTransactions}
          onDelete={onDeleteTransaction}
          onEdit={onEditTransaction}
          compact
        />
      </div>

    </div>
  )
}