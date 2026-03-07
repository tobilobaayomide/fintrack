import { CATEGORIES } from "../constants/categories"

export function groupByCategory(transactions) {
  return CATEGORIES.map(cat => ({
    ...cat,
    total: transactions
      .filter(tx => tx.category === cat.id && tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0),
  })).filter(cat => cat.total > 0)
}