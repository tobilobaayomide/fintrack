import { CATEGORIES } from "../../constants/categories"
import { FiSearch, FiX, FiSliders } from "react-icons/fi"
import Button from "../ui/Button"

export default function TransactionFilters({ filters, onFilterChange }) {
  const handleChange = (key, value) => {
    onFilterChange(prev => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    onFilterChange({ type: "all", category: "all", query: "", from: "", to: "" })
  }

  const activeCount = [
    filters.query,
    filters.type !== "all" && filters.type,
    filters.category !== "all" && filters.category,
    filters.from,
    filters.to,
  ].filter(Boolean).length

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm space-y-4">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiSliders className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-700">Filters</span>
        </div>
        {activeCount > 0 && (
         <Button onClick={handleReset} variant="ghost">Clear All</Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-end gap-3">

        <div className="flex-[2] min-w-[160px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Search
          </label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              value={filters.query}
              onChange={e => handleChange("query", e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 placeholder:text-slate-400 text-sm text-slate-800 focus:outline-none"
            />
            {filters.query && (
              <button
                onClick={() => handleChange("query", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={filters.category}
            onChange={e => handleChange("category", e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer
              ${filters.category !== "all"
                ? "bg-slate-50 slate-700 font-semibold"
                : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="w-36">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Type
          </label>
          <select
            value={filters.type}
            onChange={e => handleChange("type", e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer
              ${filters.type === "income"
                ? "border-slate-200 bg-slate-50 text-emerald-700 font-semibold"
                : filters.type === "expense"
                ? "border-slate-200 bg-slate-50 text-rose-700 font-semibold"
                : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            From
          </label>
          <input
            type="date"
            value={filters.from}
            onChange={e => handleChange("from", e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer
              ${filters.from
                ? " bg-slate-50 font-semibold"
                : " bg-slate-50 text-slate-700"
              }`}
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            To
          </label>
          <input
            type="date"
            value={filters.to}
            onChange={e => handleChange("to", e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer
              ${filters.to
                ? " bg-slate-50  font-semibold"
                : " bg-slate-50 text-slate-700"
              }`}
          />
        </div>

      </div>
    </div>
  )
}