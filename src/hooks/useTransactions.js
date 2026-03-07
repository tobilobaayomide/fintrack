import { useLocalStorage } from "./useLocalStorage"
import toast from "react-hot-toast"

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage("fintrack_transactions", [])

  const addTransaction = (tx) => {
    const id = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

    setTransactions(prev => [...prev, { ...tx, id }])
    toast.success("Transaction added!")
  }

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id))
    toast.error("Transaction deleted.")
  }

  const editTransaction = (id, updatedData) => {
    setTransactions(prev =>
      prev.map(tx => tx.id === id ? { ...tx, ...updatedData } : tx)
    )
    toast.success("Changes saved.")
  }

  const getByMonth = (month) =>
    transactions.filter(tx => tx.date.startsWith(month))

  const getTotals = (month) => {
    const monthTxs = getByMonth(month)
    const income = monthTxs
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)
    const expenses = monthTxs
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
    return { income, expenses, net: income - expenses }
  }

  return { transactions, addTransaction, deleteTransaction, editTransaction, getByMonth, getTotals }
}
