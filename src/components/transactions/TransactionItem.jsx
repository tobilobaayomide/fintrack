import { useState } from "react"
import { formatCurrency } from "../../utils/formatCurrency"
import { CATEGORIES } from "../../constants/categories"
import { FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi"

export default function TransactionItem({ transaction, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const cat = CATEGORIES.find(c => c.id === transaction.category)
  const Icon = cat?.icon
  const color = cat?.color || "#94a3b8"
  const isIncome = transaction.type === "income"

  const dateStr = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="group flex items-center justify-between p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors duration-200">

      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-300"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 tracking-tight truncate">
            {transaction.description || cat?.label || "Transaction"}
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{dateStr}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 pl-3">

        <span className={`text-sm font-bold tabular-nums ${isIncome ? "text-emerald-600" : "text-slate-900"}`}>
          {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
        </span>

        {!confirmDelete ? (
          <div className="flex items-center gap-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(transaction)}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Delete"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-100 rounded-xl px-2 py-1">
            <span className="text-xs font-semibold text-rose-600 mr-1">Delete?</span>
            <button
              onClick={() => onDelete(transaction._id)}
              className="p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
            >
              <FiCheck className="w-3 h-3" />
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="p-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors"
            >
              <FiX className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

    </div>
  )
}