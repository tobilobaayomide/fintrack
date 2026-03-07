import { useState } from "react"

const DEFAULT_FILTERS = {
  type: "all",
  category: "all",
  query: "",
  from: "",
  to: "",
}

export function useFilters(transactions) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const filteredTransactions = transactions.filter((t) => {
    const matchesType     = filters.type === "all" || t.type === filters.type
    const matchesCategory = filters.category === "all" || t.category === filters.category
    const matchesSearch   = 
      t.description.toLowerCase().includes(filters.query.toLowerCase()) ||
      t.amount.toString().includes(filters.query)

    const txDate      = new Date(t.date)
    const matchesFrom = !filters.from || txDate >= new Date(filters.from)
    const matchesTo   = !filters.to   || txDate <= new Date(filters.to)

    return matchesType && matchesCategory && matchesSearch && matchesFrom && matchesTo
  })

  return { filters, setFilters, filteredTransactions }
}