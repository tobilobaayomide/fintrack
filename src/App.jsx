import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { useTransactions } from "./hooks/useTransactions"
import { useBudgets } from "./hooks/useBudgets"
import { useFilters } from "./hooks/useFilters"
import { useTransactionForm } from "./hooks/useTransactionForm"
import Sidebar from "./components/layout/Sidebar"
import { TransactionForm } from "./components/transactions"
import DashboardPage from "./pages/DashboardPage"
import TransactionsPage from "./pages/TransactionsPage"
import BudgetsPage from "./pages/BudgetsPage"

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  })

  const { addTransaction, deleteTransaction, editTransaction, getByMonth, getTotals } = useTransactions()
  const { getBudget, setBudget, getBudgetStatus } = useBudgets()
  
  const monthTransactions = getByMonth(currentMonth)
  const totals = getTotals(currentMonth)
  const { filters, setFilters, filteredTransactions } = useFilters(monthTransactions)

  const form = useTransactionForm(addTransaction, editTransaction)

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          className: 'text-sm font-semibold text-slate-800 shadow-lg border border-slate-200/80',
          style: { borderRadius: '16px', background: '#ffffff' },
          success: { iconTheme: { primary: '#10b981', secondary: '#ffffff' } },
          error: { iconTheme: { primary: '#f43f5e', secondary: '#ffffff' } },
        }}
      />
      
      <div className="flex min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">

        <Sidebar
          activePath={location.pathname}
          onTabChange={(path) => navigate(path)}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          onAddClick={form.openForNew}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-8xl mx-auto px-6 py-10">
            <Routes>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <DashboardPage
                    currentMonth={currentMonth}
                    totals={totals}
                    monthTransactions={monthTransactions}
                    getBudget={getBudget}
                    setBudget={setBudget}
                    getBudgetStatus={getBudgetStatus}
                    onDeleteTransaction={deleteTransaction}
                    onEditTransaction={form.openForEdit}
                    onViewAll={() => navigate("/transactions")}
                  />
                }
              />
              <Route
                path="/transactions"
                element={
                  <TransactionsPage
                    filters={filters}
                    onFilterChange={setFilters}
                    filteredTransactions={filteredTransactions}
                    onDeleteTransaction={deleteTransaction}
                    onEditTransaction={form.openForEdit}
                    onAddClick={form.openForNew}
                  />
                }
              />
              <Route
                path="/budgets"
                element={
                  <BudgetsPage
                    currentMonth={currentMonth}
                    monthTransactions={monthTransactions}
                    getBudget={getBudget}
                    setBudget={setBudget}
                    getBudgetStatus={getBudgetStatus}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>

        <TransactionForm
          isOpen={form.isOpen}
          onClose={form.close}
          onSubmit={form.submit}
          editingTransaction={form.editingTransaction}
        />

      </div>
    </>
  )
}