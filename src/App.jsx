import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { useTransactions } from "./hooks/useTransactions"
import { useBudgets } from "./hooks/useBudgets"
import { useFilters } from "./hooks/useFilters"
import { useTransactionForm } from "./hooks/useTransactionForm"
import { useAuth } from "./context/AuthContext"
import Sidebar from "./components/layout/Sidebar"
import MobileNavBar from "./components/layout/MobileNavBar"
import { TransactionForm } from "./components/transactions"
import DashboardPage from "./pages/DashboardPage"
import TransactionsPage from "./pages/TransactionsPage"
import BudgetsPage from "./pages/BudgetsPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}

// Main app layout — only shown when logged in
function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuth()

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  })
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const { addTransaction, deleteTransaction, editTransaction, getByMonth, getTotals } = useTransactions()
  const { getBudget, setBudget, getBudgetStatus } = useBudgets()

  const monthTransactions = getByMonth(currentMonth)
  const totals = getTotals(currentMonth)
  const { filters, setFilters, filteredTransactions } = useFilters(monthTransactions)

  const form = useTransactionForm(addTransaction, editTransaction)

  return (
    <div className={`flex min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 ${isSidebarOpen ? "overflow-hidden" : ""}`}>

      <Sidebar
        activePath={location.pathname}
        onTabChange={(path) => {
          navigate(path)
          setSidebarOpen(false)
        }}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        onAddClick={form.openForNew}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onLogout={() => {
          logout()
          navigate("/login")
        }}
      />

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "overflow-hidden pointer-events-none blur-sm select-none" : "overflow-y-auto"}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">

          <MobileNavBar
            currentMonth={currentMonth}
            onOpenMenu={() => setSidebarOpen(true)}
          />

          <Routes>
            <Route
              path="/"
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {form.isOpen && (
        <TransactionForm
          isOpen
          onClose={form.close}
          onSubmit={form.submit}
          editingTransaction={form.editingTransaction}
        />
      )}

    </div>
  )
}

export default function App() {
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

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}