import { useState, useEffect } from "react"
import { CATEGORIES } from "../../constants/categories"
import { FiX, FiTrendingUp, FiTrendingDown, FiAlignLeft, FiCalendar } from "react-icons/fi"
import Button from "../ui/Button"

const DEFAULT_FORM = {
  type: "expense",
  amount: "",
  category: "food",
  description: "",
  date: new Date().toISOString().split("T")[0],
}

export default function TransactionForm({ isOpen, onClose, onSubmit, editingTransaction }) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      if (editingTransaction) {
        setForm({
          type: editingTransaction.type,
          amount: String(editingTransaction.amount),
          category: editingTransaction.category,
          description: editingTransaction.description || "",
          date: editingTransaction.date,
        })
      } else {
        setForm(DEFAULT_FORM)
      }
      setErrors({})
    }
  }, [editingTransaction, isOpen])

  function validate() {
    const errs = {}
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      errs.amount = "Enter a valid amount"
    if (!form.date)
      errs.date = "Pick a date"
    return errs
  }

  function handleSubmit() {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit({ ...form, amount: Number(form.amount) })
    setForm(DEFAULT_FORM)
    setErrors({})
  }

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col
        transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {editingTransaction ? "Edit Transaction" : "New Transaction"}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {editingTransaction ? "Update the transaction details" : "Add a new record to your dashboard"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          <div className="bg-slate-100/80 p-1 rounded-xl flex gap-1">
            {[
              { id: "expense", label: "Expense", icon: FiTrendingDown },
              { id: "income",  label: "Income",  icon: FiTrendingUp  },
            ].map(({ id, label, icon: Icon }) => {
              const isActive = form.type === id;
              return (
                <button
                  key={id}
                  onClick={() => setForm(f => ({ ...f, type: id }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                    ${isActive
                      ? `bg-white shadow-sm ring-1 ring-black/5 ${id === "expense" ? "text-rose-600" : "text-emerald-600"}`
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              )
            })}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Amount
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                  <span className="text-slate-400 font-semibold text-lg">₦</span>
              </div>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                className={`w-full pl-9 pr-4 py-3.5 rounded-2xl border bg-slate-50 text-slate-900 text-2xl font-bold tracking-tight
                  focus:outline-none 
                  placeholder:text-slate-300 placeholder:font-medium
                  ${errors.amount ? "border-rose-400 bg-rose-50" : "border-slate-200/80"}`}
              />
            </div>
            {errors.amount && (
              <p className="text-rose-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1">
                {errors.amount}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon
                const isSelected = form.category === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setForm(f => ({ ...f, category: cat.id }))}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all border
                      ${isSelected
                        ? "border-transparent shadow-sm"
                        : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 text-slate-600"
                      }`}
                    style={isSelected ? {
                      backgroundColor: `${cat.color}15`,
                      borderColor: `${cat.color}30`,
                      color: cat.color,
                    } : {}}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isSelected ? `${cat.color}20` : "#e2e8f0" }}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: isSelected ? cat.color : "#64748b" }}
                      />
                    </div>
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Description <span className="normal-case font-normal text-slate-400">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <FiAlignLeft className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="What was this for?"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-800 text-sm font-medium
                  focus:outline-none
                  placeholder:text-slate-400/70"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Date
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <FiCalendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-800 text-sm font-medium
                  focus:outline-none
                  ${errors.date ? "border-rose-400 bg-rose-50" : "border-slate-200/80"}`}
              />
            </div>
            {errors.date && (
              <p className="text-rose-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1">
                {errors.date}
              </p>
            )}
          </div>

        </div>

        <div className="px-6 py-5 border-t border-slate-100 flex gap-3 bg-white">
          <Button onClick={onClose} variant="outline" size="lg" className="flex-1 font-semibold ">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary" size="lg" className="flex-1 font-semibold ">
            {editingTransaction ? "Save Changes" : "Add Transaction"}
          </Button>
        </div>
      </div>
    </>
  )
}