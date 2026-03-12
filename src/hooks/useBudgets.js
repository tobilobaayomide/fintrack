import { useState, useEffect } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"

export function useBudgets() {
  const [budgets, setBudgets] = useState([])

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const { data } = await api.get("/budgets")
        setBudgets(data)
      } catch (error) {
        toast.error("Failed to load budgets")
      }
    }
    fetchBudgets()
  }, [])

  const getBudget = (category, month) =>
    budgets.find(b => b.category === category && b.month === month)

  const setBudget = async (category, month, limit) => {
    try {
      const { data } = await api.post("/budgets", { category, month, limit })

      const exists = budgets.find(
        b => b.category === category && b.month === month
      )

      if (exists) {
        setBudgets(prev =>
          prev.map(b =>
            b.category === category && b.month === month ? data : b
          )
        )
        toast.success("Budget updated!")
      } else {
        setBudgets(prev => [...prev, data])
        toast.success("Budget created!")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save budget")
    }
  }

  const getBudgetStatus = (category, month, spent) => {
    const budget = getBudget(category, month)
    if (!budget || budget.limit === 0) return null
    const percentage = (spent / budget.limit) * 100
    return {
      limit: budget.limit,
      percentage,
      isOver: percentage > 100,
      isWarning: percentage >= 75 && percentage <= 100,
      isSafe: percentage < 75,
    }
  }

  return { budgets, getBudget, setBudget, getBudgetStatus }
}