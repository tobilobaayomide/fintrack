import { useState, useEffect } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await api.get("/transactions")
        setTransactions(data)
      } catch (error) {
        toast.error("Failed to load transactions")
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  const addTransaction = async (tx) => {
    try {
      const { data } = await api.post("/transactions", tx)
      setTransactions(prev => [data, ...prev])
      toast.success("Transaction added!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add transaction")
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`)
      setTransactions(prev => prev.filter(tx => tx._id !== id))
      toast.error("Transaction deleted.")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete transaction")
    }
  }

  const editTransaction = async (id, updatedData) => {
    try {
      const { data } = await api.put(`/transactions/${id}`, updatedData)
      setTransactions(prev =>
        prev.map(tx => tx._id === id ? data : tx)
      )
      toast.success("Changes saved.")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update transaction")
    }
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

  return { transactions, loading, addTransaction, deleteTransaction, editTransaction, getByMonth, getTotals }
}